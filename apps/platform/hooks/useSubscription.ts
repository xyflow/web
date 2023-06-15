import { PlanId } from 'config/plans';

// @todo implement me!
export type SubscriptionStatus = {
  isSubscribed: boolean;
  plan: PlanId;
  isLoading: boolean;
};

export default function useSubscription(): SubscriptionStatus {
  return {
    isSubscribed: false,
    plan: PlanId.FREE,
    isLoading: false,
  };
}
