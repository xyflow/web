'use client';

import useNhostFunction from '@/hooks/useNhostFunction';
import { useState } from 'react';
import { PricingTable, defaultSubscriptionPlans, BillingInterval, SubscriptionPlanId } from 'xy-ui';

export default function () {
  const callNhostFunction = useNhostFunction();
  const [plans, setPlans] = useState(defaultSubscriptionPlans);

  const setLoading = (isLoading: boolean) => {
    setPlans((plans) => plans.map((plan) => ({ ...plan, isLoading })));
  };

  const subscribe = async ({ plan, interval }: { plan: SubscriptionPlanId; interval: BillingInterval }) => {
    if (plan === SubscriptionPlanId.ENTERPRISE) {
      return window.open('https://xyflow.com/react-flow/pro/enterprise', '_blank');
    }

    setLoading(true);

    const response = await callNhostFunction<{ url: string }>('/stripe/create-checkout', {
      plan,
      interval,
    });

    if (response.res?.data?.url) {
      window.location.href = response.res.data.url;
      setTimeout(() => setLoading(false), 500);
      return;
    }

    setLoading(false);
  };

  return (
    <PricingTable
      plans={plans}
      onSelect={(subscribeConfig) =>
        subscribe({ plan: subscribeConfig.plan, interval: subscribeConfig.billingInterval })
      }
    />
  );
}
