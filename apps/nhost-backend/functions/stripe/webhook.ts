import { Request, Response } from 'express';
import { stripe, handleSubscriptionChange } from '../_utils';
import Stripe from 'stripe';

type NhostRequest = Request & {
  rawBody: string;
};

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

const relevantEvents = new Set([
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.paused',
  'customer.subscription.resumed',
  'customer.subscription.deleted',
]);

export default async function stripeWebhookHandler(
  req: NhostRequest,
  res: Response
) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Method not allowed.' });
  }

  //  const sig = req.headers['stripe-signature'] as string;

  try {
    // const event = stripe.webhooks.constructEvent(
    //   req.rawBody,
    //   sig,
    //   endpointSecret
    // );

    // // if (event.type === 'checkout.session.completed') {
    // //   const checkoutSession = event.data.object as Stripe.Checkout.Session;

    // //   const userId = checkoutSession.client_reference_id;
    // //   const userEmail = checkoutSession.customer_email;
    // //   const customerId = checkoutSession.customer;

    // //   await updateSubscription({ userId, userEmail, customerId });
    // //   return res.status(200).send('Subscription updated!');
    // // }

    // if (relevantEvents.has(event.type)) {
    //   const stripeEvent = event.data.object as Stripe.Subscription;

    //   console.log('WEBHOOK CALLED:', event.data);
    //   await handleSubscriptionChange(stripeEvent);
    // }

    return res.status(200).send();
  } catch (err) {
    console.log(err);
    return res.status(400).send(`Webhook Error: ${err}`);
  }
}
