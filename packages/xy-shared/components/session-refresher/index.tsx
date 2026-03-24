'use client';

import { useEffect } from 'react';
import { nhostOnClient } from '../../lib/nhost-on-client';

const remainingLifetime = 30;
// * 1000 to convert to milliseconds and /2 to check more often than the refresh interval
const checkInterval = remainingLifetime * 500;

function refreshSession() {
  void nhostOnClient.refreshSession(remainingLifetime);
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
