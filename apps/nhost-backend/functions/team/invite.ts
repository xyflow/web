import { Request, Response } from 'express';
import { getUserIdFromAuthToken } from '../_utils/jwt';
import { allowCors } from '../_utils/headers';
import { getUserIdByEmail } from '../_utils/graphql/subscriptions';
import { upsertTeamSubscription } from '../_utils/graphql/team-subscriptions';

async function inviteTeamMember(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Method not allowed.' });
  }

  const createdById = getUserIdFromAuthToken(req.headers.authorization);
  const { email } = req.body;

  if (!createdById || !email) {
    return res.status(400).send({ message: 'Bad request.' });
  }

  const userId = await getUserIdByEmail(email);
  // const subscriptionPlanId = await getSubscriptionPlanId(createdById);

  // check if member exists and get the userId
  console.log('created_by', createdById);
  console.log('email', email);
  console.log('user_id', userId);

  await upsertTeamSubscription({ createdById, email, userId, planId: 'free' });

  return res.status(200).json({ message: 'ok' });
}

export default allowCors(inviteTeamMember);
