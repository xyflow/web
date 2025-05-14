'use client';

import { ComponentProps, createContext } from 'react';
import { SubscriptionPlan } from '@/types';

export type SubscriptionContextValue = {
  plan: SubscriptionPlan;
  teamPlan: SubscriptionPlan;
};

export const SubscriptionContext = createContext<SubscriptionContextValue>(null!);

// This doesn't work
// export const SubscriptionProvider = SubscriptionContext.Provider;

export const SubscriptionProvider = (
  props: ComponentProps<typeof SubscriptionContext.Provider>,
) => <SubscriptionContext.Provider {...props} />;
