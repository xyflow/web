'use client';

import { ReactNode, useEffect, createContext, useState, FC } from 'react';
import { gql } from '@apollo/client';
import { useAuthQuery } from '@nhost/react-apollo';
import { useUserId } from '@nhost/react';
import { SubscriptionPlan } from '@/types';

type SubscriptionContextValue = {
  plan: SubscriptionPlan;
  teamPlan: SubscriptionPlan;
  isLoading: boolean;
};

const defaultContextValue = {
  plan: SubscriptionPlan.FREE,
  teamPlan: SubscriptionPlan.FREE,
  isLoading: true,
};

export const SubscriptionContext =
  createContext<SubscriptionContextValue>(defaultContextValue);

const GET_SUBSCRIPTION = gql`
  query GetSubscription($userId: uuid) {
    user_subscriptions {
      subscription_plan_id
    }
    team_subscriptions(where: { user_id: { _eq: $userId } }) {
      subscription_plan_id
    }
  }
`;

export const SubscriptionProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const userId = useUserId();
  const { data, loading } = useAuthQuery(GET_SUBSCRIPTION, {
    variables: { userId },
  });
  const [value, setValue] =
    useState<SubscriptionContextValue>(defaultContextValue);

  useEffect(() => {
    const plan =
      data?.user_subscriptions?.[0]?.subscription_plan_id ??
      SubscriptionPlan.FREE;
    const teamPlan =
      data?.team_subscriptions?.[0]?.subscription_plan_id ??
      SubscriptionPlan.FREE;
    setValue({ plan, teamPlan, isLoading: loading });
  }, [data, loading]);

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};
