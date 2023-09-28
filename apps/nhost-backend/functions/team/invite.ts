import { Request, Response } from 'express';
import { authPost } from '../_utils/middleware';
import { getSubscription } from '../_utils/graphql/subscriptions';
import {
  getIncludedSeats,
  upsertTeamSubscription,
  getTeamMembers,
} from '../_utils/graphql/team-subscriptions';
import { createUser, getUserIdByEmail } from '../_utils/graphql/users';
import { updateSeatQuantity } from '../_utils/stripe';

async function inviteTeamMember(
  req: Request,
  res: Response,
  { userId: createdById }: { userId: string }
) {
  const { email, paymentConfirmed } = req.body;

  if (!email) {
    return res
      .status(400)
      .send({ message: 'Please provide a valid email address.' });
  }

  // get the subscription from the creator to add the team member to the same plan
  const subscription = await getSubscription(createdById);

  // if the creator is not subscribed, don't add the team subscription
  if (
    !subscription ||
    !subscription.subscription_plan_id ||
    subscription.subscription_plan_id === 'free'
  ) {
    return res
      .status(400)
      .send({
        message:
          'You are not subscribed. To add team members, you need to create a subscription first.',
      });
  }

  const teamMembers = await getTeamMembers(createdById);
  const includedSeats = await getIncludedSeats(createdById);

  // @todo check if team members already contains the email

  if (teamMembers.length >= includedSeats && !paymentConfirmed) {
    return res.status(200).send({
      needsPaymentConfirmation: true,
      message: 'Please confirm to add an extra seat to your subscription.',
    });
  }

  // if the added user already exists, the user id is added to the team subscription
  let userId = await getUserIdByEmail(email);

  if (userId === createdById) {
    return res
      .status(400)
      .send({ message: 'You cannot add yourself to your team.' });
  }

  // create a user if the user doesn't exist yet
  if (!userId) {
    await createUser({ email });
    userId = await getUserIdByEmail(email);

    if (!userId) {
      return res.status(400).send({ message: 'Something went wrong.' });
    }
  }

  await upsertTeamSubscription({
    createdById,
    email,
    userId,
    planId: subscription.subscription_plan_id,
  });

  if (paymentConfirmed) {
    // buy extra seat
    await updateSeatQuantity(createdById);
  }

  return res.status(200).json({ message: 'Team member added successfully.' });
}

export default authPost(inviteTeamMember);
