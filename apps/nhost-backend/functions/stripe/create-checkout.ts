import { Request, Response } from 'express';
import stripe, { getLineItem } from '../_utils/stripe';
import { authPost } from '../_utils/middleware';
import { getOrCreateCustomer } from '../_utils/graphql/subscriptions';

async function createStripeCheckoutSession(
  req: Request,
  res: Response,
  { userId }: { userId: string }
) {
  const { plan, interval = 'month' } = req.body;

  if (!plan) {
    return res.status(405).send({ message: 'Bad request.' });
  }

  const lineItem = await getLineItem({
    plan,
    interval,
  });

  if (!lineItem) {
    return res.status(405).send({ message: 'Requested price not found.' });
  }

  const stripeCustomerId = await getOrCreateCustomer(userId);

  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    line_items: [lineItem],
    mode: 'subscription',
    success_url: `${req.headers.origin}?payment_success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/subscribe?payment_cancelled=true`,
    automatic_tax: { enabled: true },
    customer_update: {
      address: 'auto',
      name: 'auto',
    },
  });

  return res.json(session);
}

export default authPost(createStripeCheckoutSession);
