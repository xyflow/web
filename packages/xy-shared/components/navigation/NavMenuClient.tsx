'use client';

import { startTransition, useEffect, useState } from 'react';

import { createNhostClient } from '@nhost/nhost-js';
import { CookieStorage } from '@nhost/nhost-js/session';
import { NavMenuLoggedIn } from './NavMenuLoggedIn';
import { NavMenuNotLoggedIn } from './NavMenuNotLoggedIn';

const nhost = createNhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN!,
  region: process.env.NEXT_PUBLIC_NHOST_REGION!,
  storage: new CookieStorage({
    secure: process.env.NODE_ENV === 'production',
  }),
});

export function NavMenuInner({ initialHasSession }: { initialHasSession: boolean }) {
  const [hasSession, setHasSession] = useState(initialHasSession);

  useEffect(() => {
    startTransition(() => {
      setHasSession(initialHasSession);
    });
  }, [initialHasSession]);

  useEffect(() => {
    startTransition(() => {
      setHasSession(!!nhost.getUserSession());
    });
  }, []);

  return hasSession ? <NavMenuLoggedIn /> : <NavMenuNotLoggedIn />;
}
