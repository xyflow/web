import { useContext } from 'react';

import { PlanId, PricingPlan, plans } from 'config/plans';
import { SubscriptionContext } from 'components/Providers/SubscriptionProvider';

// @todo implement me!
export type SubscriptionStatus = {
  isSubscribed: boolean;
  plan: PlanId;
  isLoading: boolean;
  data: PricingPlan | null;
};

export default function useSubscription(): SubscriptionStatus {
  const subscription = useContext(SubscriptionContext);

  return {
    isSubscribed: subscription !== PlanId.FREE,
    plan: subscription,
    isLoading: false,
    data: plans[subscription],
  };
}
