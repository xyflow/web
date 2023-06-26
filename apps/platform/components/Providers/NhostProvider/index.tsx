import { getNhostSession } from '@nhost/nextjs';
import { cookies } from 'next/headers';

import NhostClientProvider from './ClientProvider';

type NhostProviderProps = {
  children: React.ReactNode;
};

export default async function NhostProvider({ children }: NhostProviderProps) {
  // const req = { cookies: cookies().get('BLA') };
  // console.log(req);

  // const nhostSession = await getNhostSession(
  //   { subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN, region: process.env.NEXT_PUBLIC_NHOST_REGION },
  //   // @ts-ignore
  //   { req: { cookies: {} } }
  // );

  // console.log(nhostSession);

  return <NhostClientProvider>{children}</NhostClientProvider>;
}
