import Stripe from 'stripe';
import { getOrCreateCustomer } from './graphql/subscriptions';
import { getIncludedSeats, getTeamMembers } from './graphql/team-subscriptions';
import { redis } from './redis';

type Prices = Record<string, Record<string, { id: string; pricing: Record<string, number> }>>;

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2022-11-15',
});

export const getPricesFromStripeApi = async () => {
  const { data } = await stripe.prices.list({
    active: true,
    expand: ['data.currency_options'],
    limit: 100,
  });

  const prices = data.reduce((res, curr) => {
    if (typeof curr.lookup_key === 'string' && curr.currency_options) {
      const productId = curr.lookup_key.split('_')[0];
      const intervalId = curr.lookup_key.split('_')[1];
      const currencies = Object.keys(curr.currency_options) ?? [];

      res[productId] = res[productId] ?? {};
      res[productId][intervalId] = res[productId][intervalId] ?? { id: curr.id, pricing: {} };

      currencies.forEach((currency) => {
        const currencyOptions = curr.currency_options?.[currency];
        // @ts-expect-error
        res[productId][intervalId].pricing[currency] =
          currencyOptions?.unit_amount ?? currencyOptions?.unit_amount_decimal ?? 0;
      });
    }
    return res;
  }, {} as Prices);

  return prices;
};

export const getPrices = async () => {
  const prices = await redis.json.get('stripe.prices', '$');

  if (prices && prices[0]) {
    return prices[0].prices as Prices;
  }

  return await getPricesFromStripeApi();
};

type GetLineItemParams = {
  plan: string;
  quantity?: number;
  interval?: 'month' | 'year';
};

export const getLineItem = async ({ plan, quantity = 1, interval = 'month' }: GetLineItemParams) => {
  const prices = await getPrices();
  const priceId = prices[plan]?.[`${interval}ly`].id;

  if (!priceId) {
    return null;
  }

  return {
    price: priceId,
    quantity,
  };
};

export async function createStripeCustomer({ email, userId }: { email?: string; userId: string }) {
  const customer = await stripe.customers.create({
    email,
    metadata: {
      userId,
      userEmail: email ?? '',
    },
  });

  return customer;
}

export async function getStripeSubscription(customerId: string) {
  const customer = await stripe.customers.retrieve(customerId, {
    expand: ['subscriptions', 'subscriptions.data.items.data'],
  });

  return (customer as Stripe.Customer).subscriptions?.data?.[0];
}

export async function updateSeatQuantity(userId: string): Promise<boolean> {
  try {
    const customerId = await getOrCreateCustomer(userId);
    const subscription = await getStripeSubscription(customerId);

    if (!subscription) {
      return false;
    }

    const includedSeats = await getIncludedSeats(userId);
    const teamMembers = await getTeamMembers(userId);
    const quantity = teamMembers.length - includedSeats;

    const products = await Promise.all(
      subscription.items?.data?.map(async (item: Stripe.SubscriptionItem) => {
        return await stripe.products.retrieve(item.price.product as string);
      })
    );

    const seatProduct = products?.find((product) => product.metadata.seats);

    if (seatProduct) {
      const seatSubscriptionItem = subscription.items?.data?.find(
        (item: Stripe.SubscriptionItem) => item.price.product === seatProduct.id
      );

      if (!seatSubscriptionItem) {
        return true;
      }

      if (quantity <= 0) {
        await stripe.subscriptionItems.del(seatSubscriptionItem.id);
        return true;
      }

      // otherwise, we want to update the quantity of the existing seat product
      await stripe.subscriptionItems.update(seatSubscriptionItem.id, {
        quantity,
      });
      return true;
    }

    // no seat item is found but we don't add seats so there is no need to do anything
    if (quantity <= 0) {
      return false;
    }

    const seatLineItem = await getLineItem({
      plan: 'seats',
      quantity,
      // @ts-ignore
      interval: subscription.plan?.interval,
    });

    // create a new subscription item for the seat product
    await stripe.subscriptionItems.create({
      subscription: subscription.id,
      ...seatLineItem,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function handlePricingChange() {
  const prices = await getPricesFromStripeApi();

  await redis.json.set('stripe.prices', '$', { prices });

  return prices;
}

export default stripe;
