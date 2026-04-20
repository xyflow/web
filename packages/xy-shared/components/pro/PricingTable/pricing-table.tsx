'use client';

import { useState } from 'react';
import { callNhostFunction } from '../../../server-actions/call-nhost-function';
import {
  BillingInterval,
  defaultSubscriptionPlans,
  PricingTable,
  SubscriptionPlanId,
} from '../../pricing-table';
import { User } from '@nhost/nhost-js/auth';

export default function PricingTableComponent({ user }: { user: User }) {
  const [plans, setPlans] = useState(defaultSubscriptionPlans);

  const setLoading = (planId: SubscriptionPlanId, isLoading: boolean) => {
    console.log('setLoading', planId, isLoading);
    setPlans((plans) =>
      plans.map((plan) =>
        plan.id === planId
          ? { ...plan, buttonLabelSignedIn: isLoading ? 'Loading...' : 'Subscribe' }
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
      return window.open('/pro/quote-request?plan=enterprise', '_blank');
    }

    setLoading(plan, true);

    await Promise.resolve();

    const response = await callNhostFunction('/stripe/create-checkout', {
      plan,
      interval,
      framework: process.env.NEXT_PUBLIC_FRAMEWORK ?? 'react',
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
      user={user}
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
