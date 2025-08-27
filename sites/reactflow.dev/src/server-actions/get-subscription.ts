'use server';

import { gql } from '@apollo/client';
import { getNhost } from '@/utils/nhost';
import { SubscriptionPlan } from '@/types';
import { User } from '@nhost/nhost-js';

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
  user: User | null;
}> {
  const nhost = await getNhost();
  const user = nhost.auth.getUser();
  if (!user) {
    return {
      plan: SubscriptionPlan.FREE,
      teamPlan: SubscriptionPlan.FREE,
      user,
    };
  }

  const { data, error } = await nhost.graphql.request(GET_SUBSCRIPTION, {
    userId: user.id,
  });

  if (error) {
    console.error(error);
  }

  const plan =
    data?.user_subscriptions?.[0]?.subscription_plan_id ?? SubscriptionPlan.FREE;
  const teamPlan =
    data?.team_subscriptions?.[0]?.subscription_plan_id ?? SubscriptionPlan.FREE;

  return {
    plan,
    teamPlan,
    user,
  };
}
