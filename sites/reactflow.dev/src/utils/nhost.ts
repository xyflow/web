import { NhostClient } from '@nhost/nhost-js';
import { cookies } from 'next/headers';
import { cache } from 'react';

// If manually saved, e.g., in server actions
export const NHOST_SESSION_KEY = 'nhostSession';
// Saved by sign-in
export const NHOST_REFRESH_TOKEN = 'nhostRefreshToken';

export const getNhost = cache(async (): Promise<NhostClient> => {
  const cookieStore = await cookies();
  const nhost = new NhostClient({
    subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN,
    region: process.env.NEXT_PUBLIC_NHOST_REGION,
    start: false,
  });

  const refreshTokenValue = cookieStore.get(NHOST_REFRESH_TOKEN)?.value;
  // @ts-expect-error -- `auth.initWithSession` must be called even with `null`, otherwise will get an error from @nhost/hasura-auth-js - Auth interpreter not set
  await nhost.auth.initWithSession({ session: null });
  if (refreshTokenValue) {
    const { error, session } = await nhost.auth.refreshSession(refreshTokenValue);
    if (error) {
      console.error(error);
    }
  }
  return nhost;
});
