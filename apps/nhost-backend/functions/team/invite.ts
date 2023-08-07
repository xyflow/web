import { Request, Response } from 'express';
import { authPost } from '../_utils/middleware';
import {
  getUserIdByEmail,
  getSubscription,
} from '../_utils/graphql/subscriptions';
import {
  getRemainingSeats,
  upsertTeamSubscription,
} from '../_utils/graphql/team-subscriptions';
import { createUser } from '../_utils/graphql/users';

async function inviteTeamMember(
  req: Request,
  res: Response,
  { userId: createdById }: { userId: string }
) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ message: 'Email missing.' });
  }

  // get the subscription from the creator to add the team member to the same plan
  const subscription = await getSubscription(createdById);

  // if the creator is not subscribed, don't add the team subscription
  if (!subscription || subscription.subscription_plan_id === 'free') {
    return res.status(400).send({ message: 'User is not subscribed.' });
  }

  // if the added user already exists, the user id is added to the team subscription
  let userId = await getUserIdByEmail(email);

  // create a user if the user doesn't exist yet
  if (!userId) {
    await createUser({ email });
    userId = await getUserIdByEmail(email);
  }

  const remainingSeats = await getRemainingSeats(createdById);

  // final check if everything needed is there
  // also check if the user is not trying to add themselves
  if (
    !userId ||
    !createdById ||
    userId === createdById ||
    !subscription.subscription_plan_id ||
    !email
  ) {
    return res.status(400).send({ message: 'Bad request.' });
  }

  console.log('created_by', createdById);
  console.log('email', email);
  console.log('user_id', userId);
  console.log('plan_id', subscription.subscription_plan_id);

  if (!remainingSeats) {
    // buy extra seat
  }

  await upsertTeamSubscription({
    createdById,
    email,
    userId,
    planId: subscription.subscription_plan_id,
  });

  return res.status(200).json({ message: 'ok' });
}

export default authPost(inviteTeamMember);
