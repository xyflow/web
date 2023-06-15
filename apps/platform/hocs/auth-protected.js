import { useRouter } from 'next/router';
import { useAuthenticationStatus } from '@nhost/nextjs';
import { PageLoader } from '../components/Loader';

const defaultOptions = {
  loader: <PageLoader />,
  redirectToLogin: true,
};

function authProtected(Component, options = defaultOptions) {
  const { loader, redirectToLogin } = options;

  const WrappedComponent = (props) => {
    const router = useRouter();
    const { isLoading, isAuthenticated } = useAuthenticationStatus();

    if (isLoading || !router.isReady) {
      return loader;
    }

    if (!isAuthenticated) {
      redirectToLogin && router.push({ pathname: '/login', query: { redirectTo: router.asPath } });
      return null;
    }

    return <Component {...props} />;
  };

  return WrappedComponent;
}

export const AuthProtected = authProtected(({ children }) => children, { loader: null, redirectToLogin: false });

export default authProtected;
