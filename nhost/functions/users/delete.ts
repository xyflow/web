import { Request, Response } from 'express';
import { authPost } from '../_utils/middleware';
import { deleteUser } from '../_utils/graphql/users';
import stripe, { getStripeSubscription } from '../_utils/stripe';
import { getSubscription } from '../_utils/graphql/subscriptions';

async function deleteUserHandler(req: Request, res: Response) {
  const userId = res.locals.userId;

  if (!userId) {
    return res.status(405).send({ message: 'Bad request.' });
  }

  // cancel existing subscription
  try {
    const subscription = await getSubscription(userId);

    if (subscription && subscription.stripe_customer_id) {
      const stripeSubscription = await getStripeSubscription(subscription.stripe_customer_id);

      if (stripeSubscription) {
        await stripe.subscriptions.update(stripeSubscription.id, { cancel_at_period_end: true });
      }
    }
  } catch (err) {
    console.log(err);
  }

  const success = await deleteUser(userId);

  return res.status(200).send({ success });
}

export default authPost(deleteUserHandler);
