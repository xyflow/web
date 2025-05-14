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
          <Pill className="inline text-react bg-pink-50 border-react">
            <PlanLabel /> plan
          </Pill>
        </span>
      </Subscribed>
      <NotSubscribed>
        <Link href="/dashboard/subscribe">
          <Pill className="inline">free plan</Pill>
        </Link>
      </NotSubscribed>
    </>
  );
}
