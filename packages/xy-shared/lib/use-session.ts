'use client';

import { Session } from '@nhost/nhost-js/session';
import { startTransition, useEffect, useState } from 'react';
import { nhostOnClient } from './nhost-on-client';

export function useSession() {
  const [session, setSession] = useState<Session | undefined | null>(undefined);

  useEffect(() => {
    startTransition(() => {
      setSession(nhostOnClient.getUserSession());
    });

    const unsubscribe = nhostOnClient.sessionStorage.onChange((session) => {
      setSession(session);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return session;
}
