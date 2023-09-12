import { Request, Response } from 'express';

import { getUser } from '../_utils/graphql/users';
import { updateWelcomeMailStatus } from '../_utils/graphql/subscriptions';
import { sendDiscordNotification } from '../_utils/discord';
import {
  sendMailTemplate,
  subscribeMailingList,
  unsubscribeMailingList,
} from '../_utils/mailjet';
import {
  MAILJET_PRO_MAILING_LIST_ID,
  MAILJET_WELCOME_MAIL_TEMPLATE_IDS,
} from '../_utils/constants';

enum PaidSubscriptionPlan {
  Starter = 'starter',
  Pro = 'pro',
}

enum FreeSubscriptionPlan {
  Free = 'free',
  Student = 'student',
  OSS = 'oss',
}

async function sendWelcomeMail(email: string, plan: PaidSubscriptionPlan) {
  const template =
    MAILJET_WELCOME_MAIL_TEMPLATE_IDS[plan] ||
    MAILJET_WELCOME_MAIL_TEMPLATE_IDS.default;

  if (email) {
    return await sendMailTemplate(
      email,
      'Welcome to React Flow Pro!',
      template
    );
  }
  return true;
}

async function sendSubscriptionNotification({
  email,
  plan,
}: {
  email: string;
  plan: PaidSubscriptionPlan | FreeSubscriptionPlan;
}) {
  if (!email || !plan) {
    return false;
  }

  const website = email.match(/\@(.*)$/g)?.[0] || '';

  const message =
    plan === FreeSubscriptionPlan.Student || plan === FreeSubscriptionPlan.OSS
      ? `👩🏽‍🎓 new ${plan.toUpperCase()} sign up: ${email}`
      : `🎉 new sub: <https://${website}> [${plan.toUpperCase()}]`;

  return await sendDiscordNotification(message);
}

export default async function handleSubscriptionChange(
  req: Request,
  res: Response
) {
  // Check header to make sure the request comes from Hasura
  if (
    req.headers['nhost-webhook-secret'] !== process.env.NHOST_WEBHOOK_SECRET
  ) {
    return res.status(400).send('Incorrect webhook secret');
  }

  const userId = req.body.event?.data?.new?.user_id;

  if (!userId) {
    return res.status(400).json({ error: 'no user id.' });
  }

  const { email } = (await getUser(userId)) ?? {};

  if (!email) {
    return res.status(400).json({ error: `no email found for user ${userId}` });
  }

  const oldPlan = req.body.event?.data?.old?.subscription_plan_id;
  const currentPlan = req.body.event?.data?.new?.subscription_plan_id;
  const sentWelcomeMail = req.body.event?.data?.new?.sent_welcome_mail;
  const subscriptionId = req.body.event?.data?.new?.id;

  if (
    currentPlan !== oldPlan &&
    (currentPlan === PaidSubscriptionPlan.Pro ||
      currentPlan === PaidSubscriptionPlan.Starter) &&
    !sentWelcomeMail
  ) {
    // send welcome mail and signup for the pro subscriber newsletter
    try {
      await sendWelcomeMail(email, currentPlan);
      await subscribeMailingList(email, MAILJET_PRO_MAILING_LIST_ID, {
        plan: currentPlan,
      });
      await sendSubscriptionNotification({ email, plan: currentPlan });
      await updateWelcomeMailStatus(subscriptionId, true);
    } catch (error) {
      console.log(error);
      // @ts-ignore
      return res.status(400).json({ error: error.toString() });
    }

    return res.status(200).json({
      success: true,
      message: `user ${userId} changed plan from ${oldPlan} to ${currentPlan}. Sent welcome mail to ${email}.`,
    });
  }

  if (
    currentPlan !== oldPlan &&
    (currentPlan === 'student' || currentPlan === 'oss')
  ) {
    await sendSubscriptionNotification({ email, plan: currentPlan });
  }

  if (currentPlan !== oldPlan && currentPlan === 'free') {
    try {
      await unsubscribeMailingList(email, MAILJET_PRO_MAILING_LIST_ID);
    } catch (error) {
      console.log(error);
      // @ts-ignore
      return res.status(400).json({ error: error.toString() });
    }
  }

  return res.status(200).json({
    success: true,
    message: `${email} changed plan from ${oldPlan} to ${currentPlan}. No emails were sent.`,
  });
}
