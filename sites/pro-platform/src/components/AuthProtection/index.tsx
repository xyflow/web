'use client';

import { redirect } from 'next/navigation';
import { useAuthenticationStatus } from '@nhost/nextjs';

import Loader from '@/components/Loader';

const AuthProtection = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isAuthenticated } = useAuthenticationStatus();

  if (isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    redirect('/signin');
  }

  return children;
};

export default AuthProtection;
