'use client';

import { FC, ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { PageLoader } from '@/components/pro/Loader';
import useQueryString from '@/hooks/useQueryString';
import useSubscription from '@/hooks/useSubscription';
import { useAuthenticationStatus } from '@nhost/react';

export const AuthProtected: FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoading, isAuthenticated } = useAuthenticationStatus();
  const isSubscriptionLoading = useSubscription().isLoading;
  const queryString = useQueryString();

  if (isLoading || isSubscriptionLoading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    redirect(`/signin${queryString}`);
  }

  return children;
};
