'use server';

import { gql } from '@apollo/client';
import { User } from '@nhost/nhost-js/auth';

import { createNhostClient } from '../utils/nhost';
import { SubscriptionPlan } from '../types';

const GET_SUBSCRIPTION = gql`
  query GetSubscription($userId: uuid) {
    user_subscriptions {
      subscription_plan_id
    }
    team_subscriptions(where: { user_id: { _eq: $userId } }) {
      subscription_plan_id
    }
  }
`;

export async function getSubscription(): Promise<{
  plan: SubscriptionPlan;
  teamPlan: SubscriptionPlan;
  user?: User | null;
}> {
  const nhost = await createNhostClient();
  const user = nhost.getUserSession()?.user;

  if (!user) {
    return {
      plan: SubscriptionPlan.FREE,
      teamPlan: SubscriptionPlan.FREE,
      user: null,
    };
  }

  console.log('before nhost.graphql.request');

  try {
    const response = await nhost.graphql.request<{
      user_subscriptions: { subscription_plan_id: SubscriptionPlan }[];
      team_subscriptions: { subscription_plan_id: SubscriptionPlan }[];
    }>(GET_SUBSCRIPTION, {
      userId: user.id,
    });
    const { data } = response.body;
    console.log('after nhost.graphql.request');

    const plan =
      data?.user_subscriptions?.[0]?.subscription_plan_id ?? SubscriptionPlan.FREE;
    const teamPlan =
      data?.team_subscriptions?.[0]?.subscription_plan_id ?? SubscriptionPlan.FREE;

    return {
      plan,
      teamPlan,
      user,
    };
  } catch (error) {
    console.error('Request Error:', error);
    return {
      plan: SubscriptionPlan.FREE,
      teamPlan: SubscriptionPlan.FREE,
      user: null,
    };
  }
}
