'use client';

import { redirect } from 'next/navigation';
import { useAuthenticationStatus } from '@nhost/nextjs';
import { PageLoader } from 'components/Loader';

const AuthProtection = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isAuthenticated } = useAuthenticationStatus();

  if (isLoading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    redirect('/login');
  }

  return children;
};

export default AuthProtection;
