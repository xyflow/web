import { useContext, useEffect, useState } from 'react';

import { SubscriptionContext } from '@/components/pro/Providers/SubscriptionProvider';
import { SubscriptionPlan } from '@/types';

export type SubscriptionStatus = {
  isSubscribed: boolean;
  isTeamSubscribed: boolean;
  isAdmin: boolean;
  plan: SubscriptionPlan;
  userPlan: SubscriptionPlan;
  teamPlan: SubscriptionPlan;
  isLoading: boolean;
};

export default function useSubscription(): SubscriptionStatus {
  const [isLoading, setIsLoading] = useState(true);
  const subscription = useContext(SubscriptionContext);

  useEffect(() => {
    if (!subscription.isLoading) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [subscription.isLoading]);

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
    isLoading: isLoading,
  };
}
