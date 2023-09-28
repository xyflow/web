'use client';

import useSubscription from '@/hooks/useSubscription';

export function Subscribed({
  requireUserSubscription = false,
  children,
}: {
  children: React.ReactNode;
  requireUserSubscription?: boolean;
}) {
  const { isSubscribed, isUserSubscribed } = useSubscription();
  const subscribed = requireUserSubscription ? isUserSubscribed : isSubscribed;

  if (!subscribed) {
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
