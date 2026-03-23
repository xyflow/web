'use client';

import { startTransition, useEffect, useState } from 'react';

import { NavMenuNotLoggedIn } from './NavMenuNotLoggedIn';
import { NavMenuLoggedIn } from './NavMenuLoggedIn';

import { createNhostClient } from '@nhost/nhost-js';
import { CookieStorage } from '@nhost/nhost-js/session';

const nhost = createNhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN!,
  region: process.env.NEXT_PUBLIC_NHOST_REGION!,
  storage: new CookieStorage({
    secure: process.env.NODE_ENV === 'production',
  }),
});

type NavMenuProps = {
  /** From RSC (request cookies) so the first paint matches SSR and avoids layout shift. */
  initialHasSession: boolean;
};

function NavMenu({ initialHasSession }: NavMenuProps) {
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

export default NavMenu;
