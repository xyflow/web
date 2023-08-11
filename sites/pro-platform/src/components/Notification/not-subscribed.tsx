import Notification from '.';
import { NotSubscribed } from '@/components/SubscriptionStatus';

export default function () {
  return (
    <NotSubscribed>
      <Notification
        title="You are currently not subscribed."
        description="If you want to unlock the pro features, please subscribe to a plan."
        button={{ label: 'Subscribe', href: '/subscribe' }}
      />
    </NotSubscribed>
  );
}
