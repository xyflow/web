import { createClient } from '@nhost/nhost-js';
import { CookieStorage } from '@nhost/nhost-js/session';

export const nhostOnClient = createClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN!,
  region: process.env.NEXT_PUBLIC_NHOST_REGION!,
  storage: new CookieStorage({
    secure: process.env.NODE_ENV === 'production',
  }),
});
