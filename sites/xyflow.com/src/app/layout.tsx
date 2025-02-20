import type { FC, ReactNode } from 'react';
import { Head } from 'nextra/components';
import { Html } from '@/components/html.client';
import { NextraLayout } from '@/components/nextra-layout';
import { generateRootMetadata } from 'xy-shared/server';
import { Fathom } from 'xy-shared';

import './global.css';

export const metadata = generateRootMetadata('xyflow', {
  description:
    'Open source libraries for creating interactive workflows, dynamic diagrams and custom node-based UIs.',
  metadataBase: new URL('https://xyflow.com'),
  keywords: [
    'xyflow',
    'node-based UI',
    'graph',
    'diagram',
    'workflow',
    'react-flow',
    'svelte-flow',
    'react',
    'svelte',
  ],
});

const RootLayout: FC<{
  children: ReactNode;
}> = async ({ children }) => {
  return (
    <Html>
      <Head color={{ hue: 333, saturation: 100 }} />
      <body>
        <Fathom id="JQTCQNLV" />
        <NextraLayout>{children}</NextraLayout>
      </body>
    </Html>
  );
};

export default RootLayout;
