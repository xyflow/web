import type { FC, ReactNode } from 'react';
import type { Metadata } from 'next';
import { Head } from 'nextra/components';
// import reactFlowPackageJson from '@xyflow/react/package.json';
import { Html } from '@/components/html.client';
import './global.css';
// import { Search } from 'xy-shared';
// import NextLink from 'next/link';
// import { Button } from '@xyflow/xy-ui';
// import { SparklesIcon } from '@heroicons/react/24/outline';
import { NextraLayout } from '@/components/nextra-layout';

const APP_NAME = 'xyflow';

export const metadata: Metadata = {
  description: `${APP_NAME} - Open source libraries for creating interactive workflows, dynamic diagrams and custom node-based UIs.`,
  // metadataBase: new URL(reactFlowPackageJson.homepage),
  // keywords: reactFlowPackageJson.keywords,
  generator: 'Next.js',
  applicationName: APP_NAME,
  appleWebApp: {
    title: APP_NAME,
  },
  title: {
    default: APP_NAME,
    template: `%s - ${APP_NAME}`,
  },
  // openGraph: {
  //   // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
  //   url: './',
  //   locale: 'en_US',
  //   type: 'website',
  //   siteName: APP_NAME,
  // },
  // twitter: {
  //   site: 'https://x.com/xyflowdev',
  //   card: 'summary_large_image',
  //   creator: '@xyflowdev',
  // },
  // alternates: {
  //   // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
  //   canonical: './',
  // },
  other: {
    robots: 'index,follow',
    //   'docsearch:site': 'react',
  },
};

const RootLayout: FC<{
  children: ReactNode;
}> = async ({ children }) => {
  return (
    <Html>
      <Head
      // color={{ hue: 333, saturation: 80 }}
      />
      <body>
        <NextraLayout>{children}</NextraLayout>
      </body>
    </Html>
  );
};

export default RootLayout;
