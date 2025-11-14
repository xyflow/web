import { Request, Response } from 'express';
import { authPost } from '../_utils/middleware';
import { getSubscription } from '../_utils/graphql/subscriptions';
import { getIncludedSeats, upsertTeamSubscription, getTeamMembers } from '../_utils/graphql/team-subscriptions';
import { createUser, getUserIdByEmail } from '../_utils/graphql/users';
import { getStripeSubscription, updateSeatQuantity } from '../_utils/stripe';
import { sendMailTemplate } from '../_utils/mailjet';
import { MAILJET_TEAM_INVITE_TEMPLATE_ID } from '../_utils/constants';

async function sendTeamMemberInviteMail(email: string) {
  if (email) {
    return await sendMailTemplate(email, 'You have been invited to React Flow Pro!', MAILJET_TEAM_INVITE_TEMPLATE_ID);
  }
  return true;
}

async function inviteTeamMember(req: Request, res: Response) {
  const createdById = res.locals.userId;
  const { email, paymentConfirmed } = req.body;

  if (!email || !createdById) {
    return res.status(400).send({ message: 'Please provide a valid email address.' });
  }

  // get the subscription from the creator to add the team member to the same plan
  const subscription = await getSubscription(createdById);

  // if the creator is not subscribed, don't add the team subscription
  if (
    !subscription ||
    !subscription.subscription_plan_id ||
    subscription.subscription_plan_id === 'free' ||
    subscription.subscription_plan_id === 'oss' ||
    subscription.subscription_plan_id === 'student'
  ) {
    return res
      .status(400)
      .send({ message: 'You are not subscribed. To add team members, you need to create a subscription first.' });
  }

  const teamMembers = await getTeamMembers(createdById);
  const includedSeats = await getIncludedSeats(createdById);

  if (teamMembers.length >= includedSeats && !paymentConfirmed) {
    return res.status(200).send({
      needsPaymentConfirmation: true,
      message: 'Please confirm to add an extra seat to your subscription.',
    });
  }

  if (teamMembers.find((member) => member.email === email)) {
    return res.status(400).send({ message: 'This email is already on your team.' });
  }

  // if the added user already exists, the user id is added to the team subscription
  let userId = await getUserIdByEmail(email);

  if (userId === createdById) {
    return res.status(400).send({ message: 'You cannot add yourself to your team.' });
  }

  if (paymentConfirmed) {
    const stripeSubscription = await getStripeSubscription(subscription.stripe_customer_id);

    if (!stripeSubscription) {
      return res.status(400).send({ message: 'Something went wrong.' });
    }
  }

  // create a user if the user doesn't exist yet
  if (!userId) {
    const cu = await createUser({ email });
    console.log(cu);

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

  // this check is used to only add a team member when the subscription update is successful
  if (paymentConfirmed) {
    await updateSeatQuantity(createdById);
  }

  try {
    await sendTeamMemberInviteMail(email);
  } catch (error) {
    console.log(error);
  }

  return res.status(200).send({ message: 'Team member added successfully.' });
}

export default authPost(inviteTeamMember);
