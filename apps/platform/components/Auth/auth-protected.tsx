'use client';

import { useRouter } from 'next/navigation';
import { useAuthenticationStatus } from '@nhost/nextjs';
import { PageLoader } from 'components/Loader';

const defaultOptions = {
  loader: <PageLoader />,
  redirectToLogin: true,
};

type Options = {
  loader?: React.ReactElement<any>;
  redirectToLogin?: boolean;
};

export function authProtected<P extends object>(Component: React.ComponentType<P>, options: Options = defaultOptions) {
  const { loader, redirectToLogin } = options;

  const WrappedComponent = (props: P) => {
    const router = useRouter();
    const { isLoading, isAuthenticated } = useAuthenticationStatus();

    if (isLoading) {
      return loader;
    }

    if (!isAuthenticated) {
      // @todo: how to pass query params here?
      redirectToLogin && router.push('/login');
      return null;
    }

    // @todo: fix this
    // @ts-ignore
    return <Component {...(props as P)} />;
  };

  return WrappedComponent;
}

export default authProtected;
