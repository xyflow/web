import Link from 'next/link';

import { PlanLabel } from '../SubscriptionStatus';
import Pill from '../Pill';
import { getSubscriptionStatus } from '../../../server-actions/get-subscription';

export default async function SubscriptionPlan() {
  const { isSubscribed } = await getSubscriptionStatus();

  if (isSubscribed) {
    return (
      <span>
        <Pill className="text-primary border-primary bg-pink-50">
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
