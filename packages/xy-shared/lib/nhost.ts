import { cookies } from 'next/headers';
import { createServerClient, NhostClient } from '@nhost/nhost-js';
import { DEFAULT_SESSION_KEY, type Session } from '@nhost/nhost-js/session';

import { COOKIE_OPTIONS } from './nhost-utils';

const key = DEFAULT_SESSION_KEY;

export async function createNhostClient(): Promise<NhostClient> {
  const cookieStore = await cookies();

  const nhost = createServerClient({
    subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN!,
    region: process.env.NEXT_PUBLIC_NHOST_REGION!,
    storage: {
      get: (): Session | null => {
        const raw = cookieStore.get(key)?.value || null;
        if (!raw) {
          return null;
        }
        const session = JSON.parse(raw) as Session;
        return session;
      },
      set: (value: Session) => {
        cookieStore.set(key, JSON.stringify(value), { ...COOKIE_OPTIONS });
      },
      remove: () => {
        cookieStore.delete(key);
      },
    },
  });

  await nhost.refreshSession(60);

  return nhost;
}
