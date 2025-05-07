'use client';

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@xyflow/xy-ui';
import { UserMenu } from './UserMenu';
import { useAuthenticationStatus } from '@nhost/react';

const NavMenu: FC<{ isAuthenticated: boolean }> = ({
  isAuthenticated: initialAuthenticated,
}) => {
  // Use isAuthenticated instead of using `<SignedIn />` or `<SignedOut />` components from
  // https://github.com/nhost/nhost/blob/main/packages/react/src/components/SignedIn.tsx
  // https://github.com/nhost/nhost/blob/main/packages/react/src/components/SignedOut.tsx
  const { isAuthenticated } = useAuthenticationStatus();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const showUserMenu = mounted ? isAuthenticated : initialAuthenticated;
  return showUserMenu ? (
    <UserMenu />
  ) : (
    <>
      <Link className="hidden sm:block shrink-0" href="/signin">
        <Button className="font-bold" variant="link">
          Sign In
        </Button>
      </Link>
      <Link className="shrink-0" href="/signup">
        <Button>Sign Up</Button>
      </Link>
    </>
  );
};

export default NavMenu;
