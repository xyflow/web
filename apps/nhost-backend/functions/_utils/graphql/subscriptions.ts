import type Stripe from 'stripe';
import { gql } from 'graphql-request';

import GraphQLClient from './client';
import { stripe } from '../stripe';

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

type UpsertSubscriptionResponse = {
  id: string;
  user_id: string;
  stripe_customer_id: string;
  subscription_plan_id: string;
};

async function upsertSubscription({
  userId,
  planId,
  stripeCustomerId,
}: UpsertSubscriptionParams): Promise<UpsertSubscriptionResponse> {
  return await GraphQLClient.request<UpsertSubscriptionResponse>(
    UPSERT_SUBSCRIPTION,
    {
      userId,
      planId,
      stripeCustomerId,
    }
  );
}

type User = {
  email: string;
  id: string;
};

type GetUserByMailResponse = {
  users: User[];
};

const GET_USER_BY_MAIL = gql`
  query GetUserByMail($email: citext!) {
    users(where: { email: { _eq: $email } }) {
      email
      id
    }
  }
`;

export async function getUserIdByEmail(email: string): Promise<string> {
  const response = await GraphQLClient.request<GetUserByMailResponse>(
    GET_USER_BY_MAIL,
    { email }
  );
  return response.users?.[0]?.id;
}

export function getCustomerId(customer: string | Stripe.Customer): string {
  return typeof customer === 'string' ? customer : customer.id;
}

export async function handleSubscriptionChange(
  stripeEvent: Stripe.Subscription
) {
  // @todo how to type the stripeEvent.customer correctly here?
  const customerId = getCustomerId(stripeEvent.customer as string);

  // @todo how to type the customer here?
  const customer = (await stripe.customers.retrieve(
    customerId
  )) as Stripe.Customer;

  if (customer && customer.email) {
    const userId = await getUserIdByEmail(customer.email);
    const status = stripeEvent.status;
    const subscriptionItem = stripeEvent.items.data[0];
    const product = await stripe.products.retrieve(
      subscriptionItem.plan.product as string
    );
    const planId = product.metadata.plan;

    if (planId && userId && status === 'active') {
      await upsertSubscription({
        userId,
        planId,
        stripeCustomerId: customerId,
      });
    }

    if (userId && (status === 'past_due' || status === 'canceled')) {
      await upsertSubscription({
        userId,
        stripeCustomerId: customerId,
        planId: 'free',
      });
    }
  }
}
