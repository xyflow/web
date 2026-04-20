'use server';

import { gql } from '@apollo/client';
import { User } from '@nhost/nhost-js/auth';

import { createNhostClient } from '../lib/nhost';
import { SubscriptionPlan } from '../types';
import { normalizeSubscription } from '../lib/pro-utils';

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

  try {
    const response = await nhost.graphql.request<{
      user_subscriptions: { subscription_plan_id: SubscriptionPlan }[];
      team_subscriptions: { subscription_plan_id: SubscriptionPlan }[];
    }>(GET_SUBSCRIPTION, {
      userId: user.id,
    });
    const { data } = response.body;

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

export async function getSubscriptionStatus(): Promise<{
  isSubscribed: boolean;
  isTeamSubscribed: boolean;
  isAdmin: boolean;
  plan: SubscriptionPlan;
  userPlan: SubscriptionPlan;
  teamPlan: SubscriptionPlan;
  user?: User | null;
}> {
  const nhost = await createNhostClient();
  const user = nhost.getUserSession()?.user;

  if (!user) {
    return {
      ...normalizeSubscription({
        plan: SubscriptionPlan.FREE,
        teamPlan: SubscriptionPlan.FREE,
      }),
      user: null,
    };
  }

  try {
    const response = await nhost.graphql.request<{
      user_subscriptions: { subscription_plan_id: SubscriptionPlan }[];
      team_subscriptions: { subscription_plan_id: SubscriptionPlan }[];
    }>(GET_SUBSCRIPTION, {
      userId: user.id,
    });
    const { data } = response.body;

    const plan =
      data?.user_subscriptions?.[0]?.subscription_plan_id ?? SubscriptionPlan.FREE;
    const teamPlan =
      data?.team_subscriptions?.[0]?.subscription_plan_id ?? SubscriptionPlan.FREE;

    return {
      ...normalizeSubscription({ plan, teamPlan }),
      user,
    };
  } catch (error) {
    console.error('Request Error:', error);
    return {
      ...normalizeSubscription({
        plan: SubscriptionPlan.FREE,
        teamPlan: SubscriptionPlan.FREE,
      }),
      user: null,
    };
  }
}
