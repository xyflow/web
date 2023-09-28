import { gql } from 'graphql-request';

import { getSubscription } from './subscriptions';
import { getStripeSubscription } from '../stripe';
import GraphQLClient from './client';

const UPSERT_TEAM_SUBSCRIPTION = gql`
  mutation UpsertTeamSubscription(
    $createdById: uuid!
    $email: citext!
    $userId: uuid
    $planId: String
  ) {
    insert_team_subscriptions_one(
      object: {
        created_by: $createdById
        subscription_plan_id: $planId
        user_id: $userId
        email: $email
      }
      on_conflict: {
        constraint: team_subscriptions_email_key
        update_columns: [user_id, email, subscription_plan_id, created_by]
      }
    ) {
      id
      user_id
      email
      subscription_plan_id
      created_by
    }
  }
`;

type UpsertSubscriptionParams = {
  userId: string;
  createdById: string;
  planId?: string;
  email?: string;
};

type TeamMember = {
  id: string;
  user_id: string;
  created_by: string;
  subscription_plan_id: string;
  email: string;
};

export async function upsertTeamSubscription({
  userId,
  planId,
  createdById,
  email,
}: UpsertSubscriptionParams): Promise<TeamMember> {
  return await GraphQLClient.request<TeamMember>(UPSERT_TEAM_SUBSCRIPTION, {
    createdById,
    userId,
    planId,
    email,
  });
}

const GET_TEAM_MEMBERS = gql`
  query GetTeamMembers($createdById: uuid!) {
    team_subscriptions(where: { created_by: { _eq: $createdById } }) {
      id
      user_id
      email
      subscription_plan_id
      created_by
    }
  }
`;

export async function getTeamMembers(
  createdById: string
): Promise<TeamMember[]> {
  const data = await GraphQLClient.request<{
    team_subscriptions: TeamMember[];
  }>(GET_TEAM_MEMBERS, {
    createdById,
  });

  return data.team_subscriptions;
}

export async function getSeatPricing(userId: string) {
  const subscription = await getSubscription(userId);
  const stripeSubscription = await getStripeSubscription(
    subscription.stripe_customer_id
  );

  return {
    currency: stripeSubscription?.currency ?? 'usd',
    billingPeriod:
      stripeSubscription?.items?.data?.[0]?.plan?.interval ?? 'monthly',
  };
}

export async function getIncludedSeats(userId: string) {
  const subscription = await getSubscription(userId);
  // this helps us to add extra seats for a subscription in the database
  const extraSeats = subscription?.extra_seats ?? 0;

  switch (subscription?.subscription_plan_id) {
    case 'starter':
      return 1 + extraSeats;
    case 'pro':
      return 5 + extraSeats;
    case 'enterprise':
      return 10 + extraSeats;
    default:
      return extraSeats;
  }
}

const UPDATE_TEAM_SUBSCRIPTION_PLAN = gql`
  mutation UpdateTeamSubscriptionPlan($createdById: uuid!, $planId: String!) {
    update_team_subscriptions(
      where: { created_by: { _eq: $createdById } }
      _set: { subscription_plan_id: $planId }
    ) {
      affected_rows
    }
  }
`;

export async function updateTeamSubscriptionPlan({
  createdById,
  planId,
}: {
  createdById: string;
  planId: string;
}): Promise<number> {
  if (!createdById || !planId) {
    return 0;
  }

  const { affected_rows } = await GraphQLClient.request<{
    affected_rows: number;
  }>(UPDATE_TEAM_SUBSCRIPTION_PLAN, {
    createdById,
    planId,
  });

  return affected_rows;
}

const REMOVE_TEAM_MEMBER = gql`
  mutation RemoveTeamMember($createdById: uuid!, $email: citext!) {
    delete_team_subscriptions(
      where: {
        _and: [
          { email: { _eq: $email } }
          { created_by: { _eq: $createdById } }
        ]
      }
    ) {
      affected_rows
    }
  }
`;

export async function removeTeamMember({
  createdById,
  email,
}: {
  createdById: string;
  email: string;
}): Promise<number> {
  if (!createdById || !email) {
    return 0;
  }

  const { affected_rows } = await GraphQLClient.request<{
    affected_rows: number;
  }>(REMOVE_TEAM_MEMBER, {
    createdById,
    email,
  });

  return affected_rows;
}
