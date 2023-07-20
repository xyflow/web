import Stripe from 'stripe';

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
  currency?: 'usd' | 'eur';
};

export const getLineItem = async ({
  plan,
  quantity = 1,
  interval,
  currency = 'usd',
}: GetLineItemParams) => {
  const prices = await getPrices();

  const priceId = prices.find(
    // @ts-ignore
    (price) =>
      // @ts-ignore
      price.product.metadata.plan === plan &&
      // @ts-ignore
      price.recurring.interval === interval &&
      price.currency === currency
  )?.id;

  if (!priceId) {
    return null;
  }

  return {
    price: priceId,
    quantity,
  };
};

export default stripe;
