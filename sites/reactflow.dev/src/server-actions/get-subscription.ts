'use server';

import { gql } from '@apollo/client';
import { getNhost } from '@/utils/nhost';
import { SubscriptionPlan } from '@/types';

export async function getSubscription(): Promise<{
  plan: SubscriptionPlan;
  teamPlan: SubscriptionPlan;
}> {
  const nhost = await getNhost();

  const payload = {
    userId: nhost.auth.getUser()!.id!,
  };

  const { data, error } = await nhost.graphql.request(
    gql`
      query GetSubscription($userId: uuid) {
        user_subscriptions {
          subscription_plan_id
        }
        team_subscriptions(where: { user_id: { _eq: $userId } }) {
          subscription_plan_id
        }
      }
    `,
    payload,
  );

  if (error) {
    const msg =
      'message' in error ? error.message : error.map((e) => e.message).join('\n');
    throw new Error(msg);
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
