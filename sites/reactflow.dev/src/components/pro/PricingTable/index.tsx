'use client';

import useNhostFunction from '@/hooks/useNhostFunction';
import { useState } from 'react';
import {
  PricingTable,
  defaultSubscriptionPlans,
  BillingInterval,
  SubscriptionPlanId,
} from '@xyflow/xy-ui';

export default function PricingTableComponent() {
  const callNhostFunction = useNhostFunction();
  const [plans, setPlans] = useState(defaultSubscriptionPlans);

  const setLoading = (planId: SubscriptionPlanId, isLoading: boolean) => {
    setPlans((plans) =>
      plans.map((plan) =>
        plan.id === planId
          ? { ...plan, buttonLabel: isLoading ? 'Loading...' : 'Subscribe' }
          : plan,
      ),
    );
  };

  const subscribe = async ({
    plan,
    interval,
  }: {
    plan: SubscriptionPlanId;
    interval: BillingInterval;
  }) => {
    if (plan === SubscriptionPlanId.ENTERPRISE) {
      return window.open('https://reactflow.dev/pro/enterprise', '_blank');
    }

    setLoading(plan, true);

    const response = await callNhostFunction('/stripe/create-checkout', {
      plan,
      interval,
    });

    if (!response.error && response.url) {
      window.location.href = response.url;
      setTimeout(() => setLoading(plan, false), 500);
      return;
    }

    setLoading(plan, false);
  };

  return (
    <PricingTable
      plans={plans}
      onSelect={(subscribeConfig) =>
        subscribe({
          plan: subscribeConfig.plan,
          interval: subscribeConfig.billingInterval,
        })
      }
    />
  );
}
