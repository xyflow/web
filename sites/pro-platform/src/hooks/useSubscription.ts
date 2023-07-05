import { useContext } from 'react';

import { SubscriptionContext } from 'components/Providers/SubscriptionProvider';
import { SubscriptionPlan } from '@/types';

export type SubscriptionStatus = {
  isSubscribed: boolean;
  plan: SubscriptionPlan;
  isLoading: boolean;
};

export default function useSubscription(): SubscriptionStatus {
  const subscription = useContext(SubscriptionContext);

  return {
    isSubscribed: subscription !== SubscriptionPlan.FREE,
    plan: subscription,
    isLoading: false,
  };
}
