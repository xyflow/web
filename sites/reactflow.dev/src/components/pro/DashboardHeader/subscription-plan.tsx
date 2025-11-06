'use client';

import Link from 'next/link';
import { Spinner } from '@xyflow/xy-ui';

import useSubscription from '@/hooks/useSubscription';
import { PlanLabel } from '@/components/pro/SubscriptionStatus';
import Pill from '@/components/pro/Pill';

export default function SubscriptionPlan() {
  const { isSubscribed, isLoading } = useSubscription();

  if (isLoading) {
    return (
      <span className="text-sm flex font-normal text-primary">
        <Spinner className="mr-2" /> loading user data...
      </span>
    );
  }

  return isSubscribed ? (
    <span>
      <Pill className="inline text-primary bg-pink-50 border-primary">
        <PlanLabel /> plan
      </Pill>
    </span>
  ) : (
    <Link href="/pro/subscribe">
      <Pill className="inline">free plan</Pill>
    </Link>
  );
}
