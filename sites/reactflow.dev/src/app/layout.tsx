import type { FC, ReactNode } from 'react';
import { Head } from 'nextra/components';
import reactFlowPackageJson from '@xyflow/react/package.json';
import { Html } from '@/components/html.client';
import './global.css';
import { generateRootMetadata } from 'xy-shared/server';

export const metadata = generateRootMetadata('React Flow', {
  description:
    'Customizable library for rendering workflows, diagrams and node-based UIs.',
  metadataBase: new URL(reactFlowPackageJson.homepage),
  keywords: reactFlowPackageJson.keywords,
  other: {
    'docsearch:site': 'react',
  },
});

const RootLayout: FC<{
  children: ReactNode;
}> = async ({ children }) => {
  return (
    <Html>
      <Head color={{ hue: 333, saturation: 80 }} />
      <body>{children}</body>
    </Html>
  );
};

export default RootLayout;
