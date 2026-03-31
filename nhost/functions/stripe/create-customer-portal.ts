import { Request, Response } from 'express';
import stripe from '../_utils/stripe';
import { authPost } from '../_utils/middleware';
import { getOrCreateCustomer } from '../_utils/graphql/subscriptions';

// @TODO: this needs to work for svelte flow too
const websiteURL = process.env.WEBSITE_URL ?? 'https://reactflow.dev';

async function createStripeCustomerPortal(req: Request, res: Response) {
  const userId = res.locals.userId;
  const stripeCustomerId = await getOrCreateCustomer(userId);

  const origin = req.headers.origin ?? `${websiteURL}/pro/dashboard`;

  const session = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${origin}/account`,
  });

  return res.json(session);
}

export default authPost(createStripeCustomerPortal);
