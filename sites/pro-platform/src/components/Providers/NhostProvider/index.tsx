import * as React from 'react';

import ClientProvider from './ClientProvider';

type Props = {
  children: React.ReactNode;
};

function NhostProvider({ children }: Props) {
  // @todo pass initial nhost session here?
  return <ClientProvider>{children}</ClientProvider>;
}

export default NhostProvider;
