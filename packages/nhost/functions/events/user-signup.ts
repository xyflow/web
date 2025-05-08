import { Request, Response } from 'express';

import { getOrCreateCustomer } from '../_utils/graphql/subscriptions';

export default async function userSignupHandler(req: Request, res: Response) {
  // Check header to make sure the request comes from Hasura
  if (req.headers['nhost-webhook-secret'] !== process.env.NHOST_WEBHOOK_SECRET) {
    return res.status(400).send('Incorrect webhook secret');
  }

  const user = req.body.event?.data?.new;

  if (!user || !user.id) {
    return res.status(400).json({ error: 'no user found.' });
  }

  const stripeCustomerId = await getOrCreateCustomer(user.id);

  return res.status(200).json({
    success: true,
    message: `user with customer id ${stripeCustomerId} created.`,
  });
}
