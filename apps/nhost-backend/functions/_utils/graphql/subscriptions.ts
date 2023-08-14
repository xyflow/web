import type Stripe from 'stripe';
import { gql } from 'graphql-request';

import GraphQLClient from './client';
import { stripe, createStripeCustomer } from '../stripe';
import { getUser, getUserIdByEmail } from './users';
import { updateTeamSubscriptionPlan } from './team-subscriptions';

const UPSERT_SUBSCRIPTION = gql`
  mutation UpsertSubscription(
    $userId: uuid!
    $planId: String
    $stripeCustomerId: String
  ) {
    insert_user_subscriptions_one(
      object: {
        user_id: $userId
        subscription_plan_id: $planId
        stripe_customer_id: $stripeCustomerId
      }
      on_conflict: {
        constraint: customers_user_id_key
        update_columns: [user_id, stripe_customer_id, subscription_plan_id]
      }
    ) {
      id
      user_id
      stripe_customer_id
      subscription_plan_id
    }
  }
`;

type UpsertSubscriptionParams = {
  userId: string;
  planId?: string;
  stripeCustomerId?: string;
};

export type Subscription = {
  id: string;
  user_id: string;
  stripe_customer_id: string;
  subscription_plan_id: string;
  extra_seats?: number;
};

export async function upsertSubscription({
  userId,
  planId,
  stripeCustomerId,
}: UpsertSubscriptionParams): Promise<Subscription> {
  return await GraphQLClient.request<Subscription>(UPSERT_SUBSCRIPTION, {
    userId,
    planId,
    stripeCustomerId,
  });
}

const GET_SUBSCRIPTION = gql`
  query GetSubscription($userId: uuid!) {
    user_subscriptions(where: { user_id: { _eq: $userId } }) {
      id
      user_id
      stripe_customer_id
      subscription_plan_id
    }
  }
`;

export async function getSubscription(userId: string): Promise<Subscription> {
  const response = await GraphQLClient.request<{
    user_subscriptions: Subscription[];
  }>(GET_SUBSCRIPTION, { userId });
  return response.user_subscriptions?.[0];
}

export async function getOrCreateCustomer(userId: string) {
  const subscription = await getSubscription(userId);

  if (subscription && subscription.stripe_customer_id) {
    return subscription.stripe_customer_id;
  }

  const { email } = await getUser(userId);
  const stripeCustomer = await createStripeCustomer({ userId, email });

  await upsertSubscription({
    userId,
    stripeCustomerId: stripeCustomer.id,
    planId: 'free',
  });

  return stripeCustomer.id;
}

const UPDATE_WELCOME_MAIL_STATUS = `
  mutation ($id: uuid!, $sent_welcome_mail: Boolean!) {
    update_user_subscriptions(
      where: {id: {_eq: $id}},
      _set: {sent_welcome_mail: $sent_welcome_mail}
    ) {
      affected_rows
    }
  }
`;

export async function updateWelcomeMailStatus(
  subscriptionId: string,
  welcomeMailStatus: boolean
) {
  const response = await GraphQLClient.request<{
    affected_rows: number;
  }>(UPDATE_WELCOME_MAIL_STATUS, {
    id: subscriptionId,
    sent_welcome_mail: welcomeMailStatus,
  });

  return response.affected_rows;
}

export async function handleSubscriptionChange(
  stripeEvent: Stripe.Subscription
) {
  const customerId =
    typeof stripeEvent.customer === 'string'
      ? stripeEvent.customer
      : stripeEvent.customer.id;

  const customer = (await stripe.customers.retrieve(
    customerId
  )) as Stripe.Customer;

  if (customer) {
    const userId =
      customer.metadata.userId ??
      (await getUserIdByEmail(customer.email || ''));
    const status = stripeEvent.status;

    const subscriptionProducts = await Promise.all(
      stripeEvent.items.data.map(async (item: Stripe.SubscriptionItem) => {
        return await stripe.products.retrieve(item.plan.product as string);
      })
    );

    const product = subscriptionProducts.find((prod) => prod.metadata.plan);
    const planId = product?.metadata.plan;

    if (planId && userId && status === 'active') {
      await upsertSubscription({
        userId,
        planId,
        stripeCustomerId: customerId,
      });

      await updateTeamSubscriptionPlan({ createdById: userId, planId });
    }

    if (userId && (status === 'past_due' || status === 'canceled')) {
      await upsertSubscription({
        userId,
        stripeCustomerId: customerId,
        planId: 'free',
      });

      await updateTeamSubscriptionPlan({ createdById: userId, planId: 'free' });
    }
  }
}
