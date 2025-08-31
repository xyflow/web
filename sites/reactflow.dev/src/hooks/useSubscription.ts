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
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('`useSubscription` must be used within a `SubscriptionProvider`');
  }
  return normalizeSubscription(context);
}
