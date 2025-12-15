import { useContext } from 'react';
import { User } from '@nhost/nhost-js/auth';

import { SubscriptionContext } from '../components/pro/Providers';
import { SubscriptionPlan } from '../types';

export type SubscriptionStatus = {
  isSubscribed: boolean;
  isTeamSubscribed: boolean;
  isAdmin: boolean;
  plan: SubscriptionPlan;
  userPlan: SubscriptionPlan;
  teamPlan: SubscriptionPlan;

  user?: User | null;
  isLoading: boolean;
  refetchUser: () => void;
};

export function useSubscription(): SubscriptionStatus {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('`useSubscription` must be used within a `SubscriptionProvider`');
  }
  return context;
}
