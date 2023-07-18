'use client';

import { redirect } from 'next/navigation';
import { useAuthenticationStatus } from '@nhost/nextjs';

import Loader from '@/components/Loader';
import useQueryString from '@/hooks/useQueryString';

const AuthProtection = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isAuthenticated } = useAuthenticationStatus();
  const queryString = useQueryString();

  if (isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    redirect(`/signin${queryString}`);
  }

  return children;
};

export default AuthProtection;
