import { type ReactNode } from 'react';

import NhostClientProvider from './NhostProvider';

export default function ClientProviders({ children }: { children: ReactNode }) {
  return <NhostClientProvider>{children}</NhostClientProvider>;
}
