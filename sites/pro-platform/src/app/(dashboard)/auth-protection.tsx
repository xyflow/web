'use client';

import { redirect } from 'next/navigation';
import { useAuthenticationStatus } from '@nhost/nextjs';

const AuthProtection = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isAuthenticated } = useAuthenticationStatus();

  if (isLoading) {
    // @todo add a loader
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    redirect('/signin');
  }

  return children;
};

export default AuthProtection;
