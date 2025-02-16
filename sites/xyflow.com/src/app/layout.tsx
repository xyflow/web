import type { FC, ReactNode } from 'react';
import type { Metadata } from 'next';
import { Head } from 'nextra/components';
import { Html } from '@/components/html.client';
import { NextraLayout } from '@/components/nextra-layout';
import './global.css';

const APP_NAME = 'xyflow';

export const metadata: Metadata = {
  description: `${APP_NAME} - Open source libraries for creating interactive workflows, dynamic diagrams and custom node-based UIs.`,
  metadataBase: new URL('https://xyflow.com'),
  keywords: [
    APP_NAME,
    'node-based UI',
    'graph',
    'diagram',
    'workflow',
    'react-flow',
    'svelte-flow',
    'react',
    'svelte',
  ],
  generator: 'Next.js',
  applicationName: APP_NAME,
  appleWebApp: {
    title: APP_NAME,
  },
  title: {
    default: APP_NAME,
    template: `%s - ${APP_NAME}`,
  },
  openGraph: {
    // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
    url: './',
    locale: 'en_US',
    type: 'website',
    siteName: APP_NAME,
  },
  twitter: {
    site: 'https://x.com/xyflowdev',
    card: 'summary_large_image',
    creator: '@xyflowdev',
  },
  alternates: {
    // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
    canonical: './',
  },
  other: {
    robots: 'index,follow',
  },
};

const RootLayout: FC<{
  children: ReactNode;
}> = async ({ children }) => {
  return (
    <Html>
      <Head color={{ hue: 333, saturation: 100 }} />
      <body>
        <NextraLayout>{children}</NextraLayout>
      </body>
    </Html>
  );
};

export default RootLayout;
