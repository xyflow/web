import Link from 'next/link';
import {
  Subscribed,
  NotSubscribed,
  PlanLabel,
} from '@/components/pro/SubscriptionStatus';
import Pill from '@/components/pro/Pill';

export default function SubscriptionPlan() {
  return (
    <>
      <Subscribed>
        <span>
          <Pill className="inline text-primary bg-pink-50 border-primary">
            <PlanLabel /> plan
          </Pill>
        </span>
      </Subscribed>
      <NotSubscribed>
        <Link href="/pro/subscribe">
          <Pill className="inline">free plan</Pill>
        </Link>
      </NotSubscribed>
    </>
  );
}
