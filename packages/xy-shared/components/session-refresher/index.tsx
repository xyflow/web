'use client';

import { useEffect } from 'react';
import { nhostOnClient } from '../../lib/nhost-on-client';

const remainingLifetime = 60;
// * 1000 to convert to milliseconds and /2 to check more often than the refresh interval
const checkInterval = remainingLifetime * 500;

function refreshSession() {
  void nhostOnClient.refreshSession(remainingLifetime);
}

export function SessionRefresher() {
  useEffect(() => {
    refreshSession();

    let intervalId: number | undefined;
    const startInterval = () => {
      if (intervalId !== undefined) {
        return;
      }

      intervalId = window.setInterval(refreshSession, checkInterval);
    };
    const stopInterval = () => {
      if (intervalId === undefined) {
        return;
      }

      window.clearInterval(intervalId);
      intervalId = undefined;
    };
    const handleWindowFocus = () => {
      refreshSession();
      startInterval();
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refreshSession();
        startInterval();
        return;
      }

      stopInterval();
    };

    startInterval();
    window.addEventListener('focus', handleWindowFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopInterval();
      window.removeEventListener('focus', handleWindowFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null;
}
