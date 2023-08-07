import { Request, Response } from 'express';
import stripe from '../_utils/stripe';
import { authPost } from '../_utils/middleware';

async function createStripeCustomerPortal(req: Request, res: Response) {
  const session = await stripe.billingPortal.sessions.create({
    customer: 'cus_OII4KVQTNsywNQ',
    return_url: `${req.headers.origin}/subscribe`,
  });

  return res.json(session);
}

export default authPost(createStripeCustomerPortal);
