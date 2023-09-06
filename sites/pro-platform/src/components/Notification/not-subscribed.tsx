import Notification, { type NotificationProps } from '.';
import { NotSubscribed } from '@/components/SubscriptionStatus';

export default function (props: NotificationProps) {
  return (
    <NotSubscribed>
      <Notification
        title="You are currently not subscribed."
        description="If you want to unlock the pro features, please subscribe to a plan."
        button={{ label: 'Subscribe', href: '/subscribe' }}
        {...props}
      />
    </NotSubscribed>
  );
}
