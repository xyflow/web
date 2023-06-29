'use client';

import { useRouter } from 'next/navigation';
import { useAuthenticationStatus } from '@nhost/nextjs';
import { PageLoader } from 'components/Loader';

const AuthProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuthenticationStatus();

  if (isLoading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  return children;
};

export default AuthProtectedLayout;
