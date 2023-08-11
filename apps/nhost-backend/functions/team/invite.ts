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
    return res.status(400).send({ message: 'Email missing.' });
  }

  // get the subscription from the creator to add the team member to the same plan
  const subscription = await getSubscription(createdById);

  // if the creator is not subscribed, don't add the team subscription
  if (
    !subscription ||
    !subscription.subscription_plan_id ||
    subscription.subscription_plan_id === 'free'
  ) {
    return res.status(400).send({ message: 'User is not subscribed.' });
  }

  const teamMembers = await getTeamMembers(createdById);
  const includedSeats = await getIncludedSeats(createdById);

  // @todo check if team members already contains the email

  if (teamMembers.length >= includedSeats && !paymentConfirmed) {
    return res.status(200).send({
      needsPaymentConfirmation: true,
      message: 'You need to confirm to buy an extra seat.',
    });
  }

  // if the added user already exists, the user id is added to the team subscription
  let userId = await getUserIdByEmail(email);

  if (userId === createdById) {
    return res.status(400).send({ message: 'You cannot add yourself.' });
  }

  // create a user if the user doesn't exist yet
  if (!userId) {
    await createUser({ email });
    userId = await getUserIdByEmail(email);

    if (!userId) {
      return res.status(400).send({ message: 'Could not create user.' });
    }
  }

  await upsertTeamSubscription({
    createdById,
    email,
    userId,
    planId: subscription.subscription_plan_id,
  });

  // @todo only do this if adding the team member was successful
  if (teamMembers.length >= includedSeats && paymentConfirmed) {
    // buy extra seat
    await updateSeatQuantity(createdById, 1);
  }

  return res.status(200).json({ message: 'ok' });
}

export default authPost(inviteTeamMember);
