'use client';

import { useSignOut, useAuthenticated } from '@nhost/react';
import Link from 'next/link';
import { Button } from 'xy-ui';

function SignInSignOutButton() {
  const { signOut } = useSignOut();
  const isAuthenticated = useAuthenticated();

  if (isAuthenticated) {
    return (
      <Button onClick={signOut} variant="outline">
        Sign Out
      </Button>
    );
  }

  return (
    <Link href="/signin">
      <Button className="rounded-lg" variant="outline">
        Sign In
      </Button>
    </Link>
  );
}

export default SignInSignOutButton;
