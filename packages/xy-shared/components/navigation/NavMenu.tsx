'use client';

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

export function NavMenu() {
  const hasSession = !!nhost.getUserSession();

  return hasSession ? <NavMenuLoggedIn /> : <NavMenuNotLoggedIn />;
}
