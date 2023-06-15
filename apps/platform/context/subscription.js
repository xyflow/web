import { createContext, useContext, useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import { useAuthQuery } from '@nhost/react-apollo';
import { useAuthenticated } from '@nhost/nextjs';

import plans from '../config/plans';

const SubscriptionContext = createContext();

const GET_SUBSCRIPTION = gql`
  query {
    user_subscriptions {
      subscription_plan_id
    }
  }
`;

// @todo move to components/Providers
export function SubscriptionContextWrapper({ children }) {
  const isAuthenticated = useAuthenticated();
  const [subscription, setSubscription] = useState(plans.free);
  const { data, loading } = useAuthQuery(GET_SUBSCRIPTION);

  useEffect(() => {
    if (data && !loading) {
      const subscriptionId = data?.user_subscriptions?.[0]?.subscription_plan_id;
      if (plans[subscriptionId] && isAuthenticated) {
        setSubscription(plans[subscriptionId]);
      } else {
        setSubscription(plans.free);
      }
    }
  }, [data, loading, isAuthenticated]);

  return <SubscriptionContext.Provider value={subscription}>{children}</SubscriptionContext.Provider>;
}

export function useSubscription() {
  return useContext(SubscriptionContext);
}

export function useIsSubscribed() {
  const subscription = useSubscription();
  return subscription && subscription.order > 0;
}
