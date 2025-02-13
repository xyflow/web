import type { FC, ReactNode } from 'react';
import type { Metadata } from 'next';
import { Head } from 'nextra/components';
import reactFlowPackageJson from '@xyflow/react/package.json';
import { ntDapperFont } from 'xy-shared/fonts';
import './global.css';

const APP_NAME = 'React Flow';

export const metadata: Metadata = {
  description: `${APP_NAME} - Customizable library for rendering workflows, diagrams and node-based UIs.`,
  metadataBase: new URL(reactFlowPackageJson.homepage),
  keywords: reactFlowPackageJson.keywords,
  generator: 'Next.js',
  applicationName: APP_NAME,
  appleWebApp: {
    title: APP_NAME,
  },
  title: {
    default: 'Node-Based UIs in React',
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
    'docsearch:site': 'react',
  },
};

const RootLayout: FC<{
  children: ReactNode;
}> = async ({ children }) => {
  return (
    <html
      className={ntDapperFont.className}
      dir="ltr"
      lang="en"
      suppressHydrationWarning
    >
      <Head color={{ hue: 333, saturation: 80 }} />
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
