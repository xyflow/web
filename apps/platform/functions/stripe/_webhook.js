import { buffer } from 'micro';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const { handleSubscriptionChange } = require('../../../utils/api/subscription');

export const config = {
  api: {
    bodyParser: false,
  },
};

const relevantEvents = new Set([
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
]);

export default async function stripeWebhookHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Method not allowed.' });
  }

  const reqBuffer = await buffer(req);
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(reqBuffer, sig, endpointSecret);

    if (relevantEvents.has(event.type)) {
      await handleSubscriptionChange(event.data.object, event.type);
    }

    return res.status(200).send();
  } catch (err) {
    console.log(err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
}
