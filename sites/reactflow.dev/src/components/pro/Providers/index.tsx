'use client';

import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { SubscriptionPlan } from '@/types';
import { getSubscription } from '@/server-actions';

export type SubscriptionContextValue = {
  plan: SubscriptionPlan;
  teamPlan: SubscriptionPlan;
};

export const SubscriptionContext = createContext<SubscriptionContextValue>(null!);

// This doesn't work
// export const SubscriptionProvider = SubscriptionContext.Provider;

export const SubscriptionProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [value, setValue] = useState<SubscriptionContextValue>({
    plan: SubscriptionPlan.FREE,
    teamPlan: SubscriptionPlan.FREE,
  });

  useEffect(() => {
    getSubscription().then((val) => {
      setValue(val);
    });
  }, []);

  return (
    <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>
  );
};
