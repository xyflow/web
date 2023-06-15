import { useRouter } from 'next/router';

import plans from '../config/plans';
import { PageLoader } from '../components/Loader';
import { useSubscription } from '../context/subscription';

const defaultOptions = {
  requirePlan: plans.starter.id,
  requireExact: false, // if you want to enable features only for a specific plan
  loader: <PageLoader />,
  redirectToSubscribe: true,
  fallback: null,
};

function getIsAllowed(subscriptionPlan, requirePlan, requireExact) {
  if (requireExact) {
    return subscriptionPlan.order === requirePlan.order;
  }

  return subscriptionPlan.order >= requirePlan.order;
}

function subscriptionProtected(Component, options = defaultOptions) {
  const { loader, requirePlan, requireExact, redirectToSubscribe, fallback } = { ...defaultOptions, ...options };

  const WrappedComponent = (props) => {
    const subscription = useSubscription();
    const router = useRouter();

    if (!subscription || !router.isReady) {
      return loader;
    }

    const isAllowed = getIsAllowed(subscription, plans[requirePlan], requireExact);

    if (!isAllowed) {
      if (fallback) {
        return fallback;
      }

      redirectToSubscribe && router.push({ pathname: '/' });
      return null;
    }

    return <Component {...props} />;
  };

  return WrappedComponent;
}

export function SubscriptionProtected({
  children,
  requirePlan = defaultOptions.requirePlan,
  requireExact = defaultOptions.requireExact,
}) {
  const Component = subscriptionProtected(() => <>{children}</>, {
    loader: null,
    redirectToSubscribe: false,
    requirePlan,
    requireExact,
  });

  return <Component />;
}

export default subscriptionProtected;
