'use client';

import { useEffect } from 'react';
import { createClient } from '@nhost/nhost-js';
import { CookieStorage } from '@nhost/nhost-js/session';

const nhost = createClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN!,
  region: process.env.NEXT_PUBLIC_NHOST_REGION!,
  storage: new CookieStorage({
    secure: process.env.NODE_ENV === 'production',
  }),
});

const remainingLifetime = 30;
// * 1000 to convert to milliseconds and /2 to check more often than the refresh interval
const checkInterval = remainingLifetime * 500;

function refreshSession() {
  void nhost.refreshSession(remainingLifetime);
}

export function SessionRefresher() {
  useEffect(() => {
    refreshSession();

    const intervalId = window.setInterval(refreshSession, checkInterval);
    const handleWindowFocus = () => {
      refreshSession();
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('check the session');
        refreshSession();
      }
    };

    window.addEventListener('focus', handleWindowFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener('focus', handleWindowFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null;
}
