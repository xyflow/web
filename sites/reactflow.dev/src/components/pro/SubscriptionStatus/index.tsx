'use client';

import useSubscription from '@/hooks/useSubscription';

export function Subscribed({
  requireAdminSubscription = false,
  children,
}: {
  children: React.ReactNode;
  requireAdminSubscription?: boolean;
}) {
  const { isSubscribed, isAdmin } = useSubscription();
  const subscribed = requireAdminSubscription ? isAdmin : isSubscribed;

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
  const { plan, isTeamSubscribed, isAdmin } = useSubscription();

  if (isAdmin) {
    return plan;
  }

  return isTeamSubscribed ? 'team' : plan;
}
