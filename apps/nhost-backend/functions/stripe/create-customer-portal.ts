import { Request, Response } from 'express';
import stripe from '../_utils/stripe';
import { authPost } from '../_utils/middleware';
import { getOrCreateCustomer } from '../_utils/graphql/subscriptions';

async function createStripeCustomerPortal(
  req: Request,
  res: Response,
  { userId }: { userId: string }
) {
  const stripeCustomerId = await getOrCreateCustomer(userId);

  const session = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${req.headers.origin}/billing`,
  });

  return res.json(session);
}

export default authPost(createStripeCustomerPortal);
