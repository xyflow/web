import { getSubscriptionStatus } from '../../../server-actions/get-subscription';

export async function Subscribed({
  requireAdminSubscription = false,
  fallback = null,
  children,
}: {
  children: React.ReactNode;
  requireAdminSubscription?: boolean;
  fallback?: React.ReactNode;
}) {
  const { isSubscribed, isAdmin } = await getSubscriptionStatus();
  const subscribed = requireAdminSubscription ? isAdmin : isSubscribed;

  if (!subscribed) {
    return fallback;
  }

  return children;
}

export async function NotSubscribed({ children }: { children: React.ReactNode }) {
  const { isSubscribed } = await getSubscriptionStatus();

  if (isSubscribed) {
    return null;
  }

  return children;
}

export async function PlanLabel() {
  const { plan, isTeamSubscribed, isAdmin } = await getSubscriptionStatus();

  if (isAdmin) {
    return plan;
  }

  return isTeamSubscribed ? 'team' : plan;
}
