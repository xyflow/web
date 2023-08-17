import { useContext } from 'react';

import { SubscriptionContext } from 'components/Providers/SubscriptionProvider';
import { SubscriptionPlan } from '@/types';

export type SubscriptionStatus = {
  isSubscribed: boolean;
  isTeamSubscribed: boolean;
  isUserSubscribed: boolean;
  plan: SubscriptionPlan;
  userPlan: SubscriptionPlan;
  teamPlan: SubscriptionPlan;
  isLoading: boolean;
};

export default function useSubscription(): SubscriptionStatus {
  const subscription = useContext(SubscriptionContext);

  return {
    isSubscribed: subscription.plan !== SubscriptionPlan.FREE || subscription.teamPlan !== SubscriptionPlan.FREE,
    isTeamSubscribed: subscription.teamPlan !== SubscriptionPlan.FREE,
    isUserSubscribed: subscription.plan !== SubscriptionPlan.FREE,
    plan: subscription.plan !== SubscriptionPlan.FREE ? subscription.plan : subscription.teamPlan,
    userPlan: subscription.plan,
    teamPlan: subscription.teamPlan,
    isLoading: subscription.isLoading,
  };
}
