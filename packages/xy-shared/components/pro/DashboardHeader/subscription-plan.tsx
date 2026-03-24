'use client';

import Link from 'next/link';

import { Spinner } from '../../ui/spinner';
import { useSubscription } from '../../../hooks/use-subscription';
import { PlanLabel } from '../SubscriptionStatus';
import Pill from '../Pill';

export default function SubscriptionPlan() {
  const { isSubscribed, isLoading } = useSubscription();

  if (isLoading) {
    return (
      <span className="text-sm flex font-normal text-primary">
        <Spinner className="mr-2" /> loading user data...
      </span>
    );
  }

  if (isSubscribed) {
    return (
      <span>
        <Pill className="text-primary bg-pink-50 border-primary">
          <PlanLabel /> plan
        </Pill>
      </span>
    );
  }

  return (
    <Link href="/pro/subscribe">
      <Pill>free plan</Pill>
    </Link>
  );
}
