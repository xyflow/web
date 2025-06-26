import { useContext } from 'react';

import { SubscriptionContext } from '@/components/pro/Providers';
import { SubscriptionPlan } from '@/types';
import { normalizeSubscription } from '@/utils/pro-utils';

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
  return normalizeSubscription(subscription);
}
