import { Request, Response } from 'express';
import stripe, { getLineItem } from '../_utils/stripe';
import { authPost } from '../_utils/middleware';
import { getOrCreateCustomer } from '../_utils/graphql/subscriptions';

const createStripeCheckoutSession = async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const { plan, interval = 'month' } = req.body;

  if (!plan || !userId) {
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

  if (!stripeCustomerId) {
    return res.status(405).send({ message: 'Stripe customer id not found.' });
  }

  const origin = req.headers.origin || 'https://pro.reactflow.dev';

  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    line_items: [lineItem],
    mode: 'subscription',
    customer_update: {
      address: 'auto',
      name: 'auto',
    },
    automatic_tax: { enabled: true },
    tax_id_collection: {
      enabled: true,
    },
    allow_promotion_codes: true,
    billing_address_collection: 'required',
    success_url: `${origin}?payment_success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/subscribe?payment_cancelled=true`,
  });

  return res.json(session);
};

export default authPost(createStripeCheckoutSession);
