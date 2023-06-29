'use client';

import useSubscription from 'hooks/useSubscription';

export default function SubscriptionCheck({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback: React.ReactNode;
}) {
  const { isSubscribed } = useSubscription();
  return isSubscribed ? children : fallback;
}
