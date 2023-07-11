import { Request, Response } from 'express';
import { handleSubscriptionChange } from '../_utils/graphql/subscriptions';
import { stripe } from '../_utils/stripe';
import type Stripe from 'stripe';

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
    return res.status(405).send({ message: 'Method not allowed.' });
  }

  const sig = req.headers['stripe-signature'] as string;

  try {
    const event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      endpointSecret
    );

    if (relevantEvents.has(event.type)) {
      const stripeEvent = event.data.object as Stripe.Subscription;
      await handleSubscriptionChange(stripeEvent);
    }

    return res.status(200).send();
  } catch (err) {
    console.log(err);
    return res.status(400).send(`Webhook Error: ${err}`);
  }
}
