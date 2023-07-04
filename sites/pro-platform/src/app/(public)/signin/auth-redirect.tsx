'use client';

import { redirect } from 'next/navigation';
import { useAuthenticationStatus } from '@nhost/nextjs';

const AuthProtection = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthenticationStatus();

  if (isAuthenticated) {
    redirect('/');
  }

  return children;
};

export default AuthProtection;
