const stripe = require('../../utils/stripe');
const { getSubscriptionByUserId } = require('../../utils/database');
const { getUserId } = require('../../utils');

export default async function createStripeCustomerPortalSession(req, res) {
  if (req.method === 'POST') {
    try {
      const authToken = req.headers.authorization;
      const userId = getUserId(authToken);
      const { stripe_customer_id: customer } = await getSubscriptionByUserId(
        userId
      );

      const session = await stripe.billingPortal.sessions.create({
        customer,
        return_url: `${req.headers.origin}/dashboard`,
      });

      return res.json({ sessionUrl: session.url });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: { statusCode: 500, message: err.message } });
    }
  }
  return res.json({ error: 'method not allowed.' });
}
