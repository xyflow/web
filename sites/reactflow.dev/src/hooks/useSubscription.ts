import { useContext } from 'react';

import { SubscriptionContext } from '@/components/pro/Providers';
import { SubscriptionPlan } from '@/types';

export type SubscriptionStatus = {
  isSubscribed: boolean;
  isTeamSubscribed: boolean;
  isAdmin: boolean;
  plan: SubscriptionPlan;
  userPlan: SubscriptionPlan;
  teamPlan: SubscriptionPlan;
};

export default function useSubscription(): SubscriptionStatus {
  const subscription = useContext(SubscriptionContext);

  return {
    isSubscribed:
      subscription.plan !== SubscriptionPlan.FREE ||
      subscription.teamPlan !== SubscriptionPlan.FREE,
    isTeamSubscribed: subscription.teamPlan !== SubscriptionPlan.FREE,
    isAdmin:
      subscription.plan !== SubscriptionPlan.FREE &&
      subscription.plan !== SubscriptionPlan.OSS &&
      subscription.plan !== SubscriptionPlan.STUDENT,
    plan:
      subscription.plan !== SubscriptionPlan.FREE
        ? subscription.plan
        : subscription.teamPlan,
    userPlan: subscription.plan,
    teamPlan: subscription.teamPlan,
  };
}
