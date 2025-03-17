import type { FC, ReactNode } from 'react';
import { Head } from 'nextra/components';
// @ts-expect-error -- we use patch, remove patch after merge https://github.com/xyflow/xyflow/pull/5019
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
      <Head color={{ hue: 15, saturation: 90 }} />
      <body>
        <Fathom id="PFWQXXRR" />
        <NextraLayout>{children}</NextraLayout>
      </body>
    </Html>
  );
};

export default RootLayout;
