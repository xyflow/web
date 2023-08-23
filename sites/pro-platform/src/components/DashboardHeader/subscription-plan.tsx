import Link from 'next/link';
import { Subscribed, NotSubscribed, PlanLabel } from '@/components/SubscriptionStatus';

export default function SubscriptionPlan() {
  return (
    <>
      <Subscribed>
        <div className="text-xs text-react bg-pink-50 px-1 py-1 rounded-xl border-react border">
          <PlanLabel /> plan
        </div>
      </Subscribed>
      <NotSubscribed>
        <Link href="/subscribe">
          <div className="text-xs bg-gray-100 px-1 py-1 rounded-xl border-gray-300 border">
            <div>not subscribed</div>
          </div>
        </Link>
      </NotSubscribed>
    </>
  );
}
