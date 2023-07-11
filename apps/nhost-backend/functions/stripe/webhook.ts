import { Request, Response } from 'express';
import { stripe, handleSubscriptionChange } from '../_utils';
import Stripe from 'stripe';

type NhostRequest = Request & {
  rawBody: string;
};

const relevantEvents = new Set([
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.paused',
  'customer.subscription.resumed',
  'customer.subscription.deleted',
]);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export default async function stripeWebhookHandler(
  req: NhostRequest,
  res: Response
) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: endpointSecret });
  }

  const sig = req.headers['stripe-signature'] as string;

  return res.status(200).send(endpointSecret);

  // try {
  //   const event = stripe.webhooks.constructEvent(
  //     req.rawBody,
  //     sig,
  //     endpointSecret
  //   );

  //   console.log(event);

  //   if (relevantEvents.has(event.type)) {
  //     const stripeEvent = event.data.object as Stripe.Subscription;
  //     await handleSubscriptionChange(stripeEvent);
  //   }

  //   return res.status(200).send();
  // } catch (err) {
  //   console.log(err);
  //   return res.status(400).send(`Webhook Error: ${err}`);
  // }
}
