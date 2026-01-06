import { Request, Response } from 'express';
import { handleSubscriptionChange } from '../_utils/graphql/subscriptions';
import { stripe, handlePricingChange } from '../_utils/stripe';
import type Stripe from 'stripe';

type NhostRequest = Request & {
  rawBody: string;
};

const subscriptionChangeEvents = new Set([
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.paused',
  'customer.subscription.resumed',
  'customer.subscription.deleted',
]);

const pricingChangeEvents = new Set(['price.created', 'price.deleted', 'price.updated']);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

const stripeWebhookHandler = async (req: NhostRequest, res: Response) => {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Method not allowed.' });
  }

  const sig = req.headers['stripe-signature'] as string;

  try {
    const event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);

    if (pricingChangeEvents.has(event.type)) {
      await handlePricingChange();
    }

    if (subscriptionChangeEvents.has(event.type)) {
      await handleSubscriptionChange(event.data.object as Stripe.Subscription);
    }

    return res.status(200).send({ message: 'ok' });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: `Webhook Error: ${err}` });
  }
};

export default stripeWebhookHandler;
