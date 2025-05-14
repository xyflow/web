import type { FC, ReactNode } from 'react';
import { Head } from 'nextra/components';
import reactFlowPackageJson from '@xyflow/react/package.json';
import { Html } from '@/components/html.client';
import { generateRootMetadata } from 'xy-shared/server';
import { Fathom } from 'xy-shared';
import { Providers } from '@/components/pro/Providers';
import { getSubscription } from '@/server-actions';
import './global.css';

export const metadata = generateRootMetadata('React Flow', {
  description:
    'Customizable library for rendering workflows, diagrams and node-based UIs.',
  metadataBase: new URL(reactFlowPackageJson.homepage),
  keywords: reactFlowPackageJson.keywords,
  other: {
    'docsearch:site': 'react',
  },
});

const fathomOptions = {
  id: 'LXMRMWLB',
  domains: ['reactflow.dev'],
};

const RootLayout: FC<{
  children: ReactNode;
}> = async ({ children }) => {
  return (
    <Html>
      <Head color={{ hue: 333, saturation: 80 }} />
      <body>
        <Fathom {...fathomOptions} />
        <Providers value={await getSubscription()}>{children}</Providers>
      </body>
    </Html>
  );
};

export default RootLayout;
