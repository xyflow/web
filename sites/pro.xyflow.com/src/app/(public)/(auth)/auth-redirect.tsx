'use client';

import { redirect } from 'next/navigation';
import { useAuthenticationStatus } from '@nhost/nextjs';

// redirects to the dashboard if the user is already signed in
const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthenticationStatus();

  if (isAuthenticated) {
    redirect('/');
  }

  return children;
};

export default AuthRedirect;
