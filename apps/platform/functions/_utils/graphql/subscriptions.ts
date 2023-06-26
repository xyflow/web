import GraphQLClient from './client';
import {
  GET_USER_SUBSCRIPTION,
  GetUserSubscriptionResponse,
  INSERT_SUBSCRIPTION,
  InsertSubscriptionResponse,
} from './requests';
import { stripe } from '../stripe';

export async function getSubscription({
  userId,
}: {
  userId: string;
}): Promise<GetUserSubscriptionResponse['user_subscriptions'][0] | undefined> {
  const subscriptions = await GraphQLClient.request<GetUserSubscriptionResponse>(GET_USER_SUBSCRIPTION, { userId });
  return subscriptions.user_subscriptions[0];
}

export async function createSubscription({
  userId,
  stripeCustomerId,
  planId,
}: {
  userId: string;
  stripeCustomerId?: string;
  planId?: string;
}) {
  const subscription = await GraphQLClient.request<InsertSubscriptionResponse>(INSERT_SUBSCRIPTION, {
    subscription: { user_id: userId, stripe_customer_id: stripeCustomerId, subscription_plan_id: planId },
  });

  return subscription.insert_user_subscriptions.returning[0];
}

// this method creates a new customer in Stripe, stores it in our db and returns its id
export async function createStripeCustomer({ userEmail, userId }: { userEmail: string; userId: string }) {
  const customer = await stripe.customers.create({
    email: userEmail,
    metadata: {
      userId,
    },
  });

  const subscription = await createSubscription({ userId, stripeCustomerId: customer.id });
  return subscription.stripe_customer_id;
}

export async function getStripeCustomerId({
  userEmail,
  userId,
}: {
  userEmail: string;
  userId: string;
}): Promise<string | undefined> {
  const existingSubscription = await getSubscription({ userId });

  // if the customer already exists, return the customer id
  if (existingSubscription && existingSubscription.stripe_customer_id) {
    return existingSubscription.stripe_customer_id;
  }

  // create a new stripe customer and return the id
  return await createStripeCustomer({ userEmail, userId });
}

export async function handleSubscriptionChange() {
  // @todo implement
}
