import type { FC, ReactNode } from 'react';
import { Head } from 'nextra/components';
import svelteFlowPackageJson from '@xyflow/svelte/package.json';
import { Html } from '@/components/html.client';
import { NextraLayout } from '@/components/nextra-layout';
import { generateRootMetadata } from 'xy-shared/server';
import { Fathom } from 'xy-shared';

import './global.css';

export const metadata = generateRootMetadata('Svelte Flow', {
  description:
    'Customizable library for rendering workflows, diagrams and node-based UIs.',
  metadataBase: new URL(svelteFlowPackageJson.homepage),
  keywords: svelteFlowPackageJson.keywords,
  other: {
    'docsearch:site': 'svelte',
  },
});

const RootLayout: FC<{
  children: ReactNode;
}> = async ({ children }) => {
  return (
    <Html>
      <Head color={{ hue: 15, saturation: 90 }}>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <body>
        <Fathom id="XLBRAGEV" />
        <NextraLayout>{children}</NextraLayout>
      </body>
    </Html>
  );
};

export default RootLayout;
