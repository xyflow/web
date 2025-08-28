import { Head } from 'nextra/components';
import reactFlowPackageJson from '@xyflow/react/package.json';
import { Html } from '@/components/html.client';
import { generateRootMetadata } from 'xy-shared/server';
import { Fathom } from 'xy-shared';
import { LayoutDynamic } from './layout.dynamic';
import './global.css';

export const dynamicParams = false;
export const revalidate = false;

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

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <Html>
      <Head color={{ hue: 333, saturation: 80 }} />
      <body>
        <Fathom {...fathomOptions} />
        <LayoutDynamic>{children}</LayoutDynamic>
      </body>
    </Html>
  );
}
