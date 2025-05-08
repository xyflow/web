'use client';

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@xyflow/xy-ui';
import { UserMenu } from './UserMenu';
import { useAuthenticationStatus } from '@nhost/react';
import Loader from '@/components/pro/Loader';

const NavMenu: FC = () => {
  // Use isAuthenticated instead of using `<SignedIn />` or `<SignedOut />` components from
  // https://github.com/nhost/nhost/blob/main/packages/react/src/components/SignedIn.tsx
  // https://github.com/nhost/nhost/blob/main/packages/react/src/components/SignedOut.tsx
  const { isAuthenticated, isLoading } = useAuthenticationStatus();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (isLoading || !mounted) {
    return <Loader />;
  }
  if (isAuthenticated) {
    return <UserMenu />;
  }
  return (
    <Button asChild variant="secondary">
      <Link href="/signin">Sign In / Sign Up</Link>
    </Button>
  );
};

export default NavMenu;
