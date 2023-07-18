const {
  getUserEmail,
  createStudentSubscription,
  createOpenSourceSubscription,
} = require('../../utils/database');

// @todo re-enable this function and convert to TS
export default async function handler(req, res) {
  // Check header to make sure the request comes from Hasura
  if (
    req.headers['nhost-webhook-secret'] !== process.env.NHOST_WEBHOOK_SECRET
  ) {
    return res.status(400).send('Incorrect webhook secret');
  }

  const user = req.body.event?.data?.new;

  if (!user || !user.id) {
    return res.status(400).json({ error: 'no user found.' });
  }

  const email = await getUserEmail(user.id);

  if (!email) {
    return res
      .status(400)
      .json({ error: `no email found for user ${user.id}` });
  }

  if (user.metadata?.student) {
    try {
      await createStudentSubscription({ user_id: user.id });

      return res.status(200).json({
        success: true,
        message: `student subscription with email ${email} created.`,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.toString() });
    }
  }

  if (user.metadata?.openSource) {
    try {
      await createOpenSourceSubscription({ user_id: user.id });

      return res.status(200).json({
        success: true,
        message: `oss subscription with email ${email} created.`,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.toString() });
    }
  }

  return res.status(200).json({
    success: true,
    message: `user with email ${email} created.`,
  });
}
