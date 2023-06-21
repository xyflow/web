import { PlanId, PricingPlan, plans } from 'config/plans';

// @todo implement me!
export type SubscriptionStatus = {
  isSubscribed: boolean;
  plan: PlanId;
  isLoading: boolean;
  data: PricingPlan | null;
};

export default function useSubscription(): SubscriptionStatus {
  return {
    isSubscribed: true,
    plan: PlanId.PRO,
    isLoading: false,
    data: plans.pro,
  };
}
