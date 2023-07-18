'use client';

import useSubscription from '@/hooks/useSubscription';

export function Subscribed({ children }: { children: React.ReactNode }) {
  const { isSubscribed, plan } = useSubscription();

  if (!isSubscribed) {
    return null;
  }

  return children;
}

export function NotSubscribed({ children }: { children: React.ReactNode }) {
  const { isSubscribed } = useSubscription();

  if (isSubscribed) {
    return null;
  }

  return children;
}

export function PlanLabel() {
  const { plan } = useSubscription();

  return plan;
}
