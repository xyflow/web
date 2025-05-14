import { createContext } from 'react';
import { SubscriptionPlan } from '@/types';

export type SubscriptionContextValue = {
  plan: SubscriptionPlan;
  teamPlan: SubscriptionPlan;
};

export const SubscriptionContext =
  createContext<SubscriptionContextValue>(null!);

export const SubscriptionProvider = SubscriptionContext.Provider
