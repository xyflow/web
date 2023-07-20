import { Request, Response } from 'express';
import stripe, { getLineItem } from '../_utils/stripe';
import { allowCors, allowMethod } from '../_utils/middleware';

async function createStripeCheckoutSession(req: Request, res: Response) {
  const { plan, interval = 'month', currency = 'usd' } = req.body;

  if (!plan) {
    return res.status(405).send({ message: 'Bad request.' });
  }

  const lineItem = await getLineItem({
    plan,
    interval,
    currency,
  });

  if (!lineItem) {
    return res.status(405).send({ message: 'Requested price not found.' });
  }

  const session = await stripe.checkout.sessions.create({
    customer: 'cus_OII4KVQTNsywNQ',
    line_items: [lineItem],
    mode: 'subscription',
    success_url: `${req.headers.origin}?payment_success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/subscribe?payment_cancelled=true`,
    automatic_tax: { enabled: true },
  });

  console.log(session);

  return res.json(session);
}

export default allowCors(allowMethod(createStripeCheckoutSession, 'POST'));
