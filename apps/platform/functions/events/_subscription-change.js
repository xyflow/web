const {
  getUserEmail,
  updateWelcomeMailStatus,
} = require('../../utils/database');

const {
  sendWelcomeMail,
  subscribeProMailinglist,
  unsubscribeProMailinglist,
} = require('../../utils/mailjet');

const { sendSubscriptionNotification } = require('../../utils/discord');

export default async function handler(req, res) {
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

  const email = await getUserEmail(userId);

  if (!email) {
    return res.status(400).json({ error: `no email found for user ${userId}` });
  }

  const oldPlan = req.body.event?.data?.old?.subscription_plan_id;
  const currentPlan = req.body.event?.data?.new?.subscription_plan_id;
  const sentWelcomeMail = req.body.event?.data?.new?.sent_welcome_mail;
  const subscriptionId = req.body.event?.data?.new?.id;

  if (
    currentPlan !== oldPlan &&
    (currentPlan === 'pro' || currentPlan === 'starter') &&
    !sentWelcomeMail
  ) {
    // send welcome mail and signup for the pro subscriber newsletter
    try {
      await sendWelcomeMail(email, currentPlan);
      await subscribeProMailinglist(email, currentPlan);
      await sendSubscriptionNotification({ email, plan: currentPlan });
      await updateWelcomeMailStatus(subscriptionId, true);
    } catch (error) {
      console.log(error);
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
      await unsubscribeProMailinglist(email);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.toString() });
    }
  }

  return res.status(200).json({
    success: true,
    message: `${email} changed plan from ${oldPlan} to ${currentPlan}. No emails were sent.`,
  });
}
