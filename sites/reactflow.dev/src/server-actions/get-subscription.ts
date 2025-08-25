'use server';

import { gql } from '@apollo/client';
import { getNhost } from '@/utils/nhost';
import { SubscriptionPlan } from '@/types';

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
}> {
  const nhost = await getNhost();
  const userId = nhost.auth.getUser()?.id;

  if (!userId) {
    return {
      plan: SubscriptionPlan.FREE,
      teamPlan: SubscriptionPlan.FREE,
    };
  }

  const { data, error } = await nhost.graphql.request(GET_SUBSCRIPTION, { userId });

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
  };
}
