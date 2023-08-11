import Stripe from 'stripe';
import { getOrCreateCustomer } from './graphql/subscriptions';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2022-11-15',
});

let prices: Stripe.Price[] | null = null;

export const getPrices = async () => {
  if (prices) {
    return prices;
  }

  const { data } = await stripe.prices.list({
    active: true,
    expand: ['data.product'],
  });

  prices = data;

  return prices;
};

type GetLineItemParams = {
  plan: string;
  quantity?: number;
  interval?: 'month' | 'year';
};

export const getLineItem = async ({
  plan,
  quantity = 1,
  interval,
}: GetLineItemParams) => {
  const prices = await getPrices();

  const priceId = prices.find(
    // @ts-ignore
    (price) =>
      // @ts-ignore
      (plan === 'seats'
        ? // @ts-ignore
          price.product.metadata.seats
        : // @ts-ignore
          price.product.metadata.plan === plan) &&
      // @ts-ignore
      price.recurring.interval === interval
  )?.id;

  if (!priceId) {
    return null;
  }

  return {
    price: priceId,
    quantity,
  };
};

export async function createStripeCustomer({
  email,
  userId,
}: {
  email: string;
  userId: string;
}) {
  const customer = await stripe.customers.create({
    email,
    metadata: {
      userId,
    },
  });

  return customer;
}

export async function getStripeSubscription(customerId: string) {
  const customer = await stripe.customers.retrieve(customerId, {
    expand: ['subscriptions', 'subscriptions.data.items.data'],
  });

  // @ts-ignore
  return customer?.subscriptions?.data?.[0];
}

export async function updateSeatQuantity(userId: string, seatChange: number) {
  const customerId = await getOrCreateCustomer(userId);
  const subscription = await getStripeSubscription(customerId);

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

    const { id, quantity } = seatSubscriptionItem;

    const nextQuantity = quantity + seatChange;

    if (nextQuantity <= 0) {
      // @todo is this correct? should we be deleting the subscription item?
      return await stripe.subscriptionItems.del(id);
    }

    // otherwise, we want to update the quantity of the existing seat product
    return await stripe.subscriptionItems.update(id, {
      quantity: nextQuantity,
    });
  }

  if (seatChange <= 0) {
    return false;
  }

  const seatLineItem = await getLineItem({
    plan: 'seats',
    quantity: 1,
    interval: 'month',
  });

  // if we get here, we need to add a seat product
  return await stripe.subscriptionItems.create({
    subscription: subscription.id,
    ...seatLineItem,
  });
}

export default stripe;
