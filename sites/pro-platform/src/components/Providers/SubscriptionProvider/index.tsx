'use client';

import { ReactNode, useEffect, createContext, useState } from 'react';
import { gql } from '@apollo/client';
import { useAuthQuery } from '@nhost/react-apollo';

import { SubscriptionPlan } from '@/types';

type Props = {
  children: ReactNode;
};

export const SubscriptionContext = createContext<SubscriptionPlan>(SubscriptionPlan.FREE);

const GET_SUBSCRIPTION = gql`
  query {
    user_subscriptions {
      subscription_plan_id
    }
  }
`;

const SubscriptionProvider = ({ children }: Props) => {
  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlan>(SubscriptionPlan.FREE);
  const { data } = useAuthQuery(GET_SUBSCRIPTION);

  useEffect(() => {
    const plan = data?.user_subscriptions?.[0]?.subscription_plan_id;

    if (plan && plan !== SubscriptionPlan.FREE) {
      setSubscriptionPlan(plan as SubscriptionPlan);
    }
  }, [data]);

  return <SubscriptionContext.Provider value={subscriptionPlan}>{children}</SubscriptionContext.Provider>;
};

export default SubscriptionProvider;
