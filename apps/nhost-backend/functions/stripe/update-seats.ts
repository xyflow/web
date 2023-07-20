import type { Request, Response } from 'express';
import type { Stripe } from 'stripe';
import stripe from '../_utils/stripe';
import { allowCors, allowMethod } from '../_utils/middleware';

async function updateMemberSeats(req: Request, res: Response) {
  const customer = await stripe.customers.retrieve('cus_OII4KVQTNsywNQ', {
    expand: ['subscriptions', 'subscriptions.data.items.data'],
  });

  // @ts-ignore
  const subscription = customer?.subscriptions?.data?.[0];

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

    const response = await stripe.subscriptionItems.update(id, {
      quantity: quantity - 1,
    });
    return res.json(response);
  }

  console.log(products);

  return res.json({ customer, products });
}

export default allowCors(updateMemberSeats);
