import type { FC, ReactNode } from 'react';
import Link from 'next/link';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import { Layout, Navbar } from 'nextra-theme-docs';
import { Anchor } from 'nextra/components';
import { Button } from 'xy-shared/components/ui/button';
import { Footer } from 'xy-shared/components/footer';
import { Logo } from 'xy-shared/components/ui/logo';
import { Text } from 'xy-shared/components/ui/text';
import { defaultCategories } from 'xy-shared/components/footer/default-categories';
import { Html } from 'xy-shared/components/html';
import { generateRootMetadata } from 'xy-shared/server/generate-root-metadata';
import { Fathom } from 'xy-shared/components/fathom';

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

const footerCategories = {
  ...defaultCategories,
  Legal: [
    { title: 'Terms of Use', route: 'https://xyflow.com/terms-of-use' },
    {
      title: 'Ethical Standards',
      route: 'https://xyflow.com/ethical-standards',
    },
    { title: 'Pro License', route: 'https://xyflow.com/pro-license' },
    { title: 'Privacy Policy', route: 'https://xyflow.com/privacy' },
    { title: 'Imprint', route: 'https://xyflow.com/imprint' },
  ],
};

const RootLayout: FC<{
  children: ReactNode;
}> = async ({ children }) => {
  const pageMap = await getPageMap();

  return (
    <Html>
      <Head color={{ hue: 333, saturation: 100 }} />
      <body>
        <Fathom id="JQTCQNLV" />
        <Layout
          darkMode={false}
          docsRepositoryBase="https://github.com/xyflow/web/tree/main/sites/xyflow.com"
          editLink="Edit this page on GitHub"
          feedback={{ content: null }}
          footer={
            <Footer
              baseUrl="https://xyflow.com"
              categories={footerCategories}
              message={{
                title: 'Hello from the xyflow team',
                text: 'xyflow is building and maintaining open source software for node-based UIs since 2019.',
              }}
            />
          }
          navbar={
            <Navbar
              align="left"
              logo={
                <div className="flex space-x-2 items-center">
                  <Link className="flex space-x-2 items-center" href="/">
                    <Logo className="h-9 w-9" />
                    <Text className="font-black text-xl leading-none">xyflow</Text>
                  </Link>
                </div>
              }
              logoLink={false}
            >
              <Button asChild>
                <Link className="shrink-0" href="/contact">
                  Contact Us
                </Link>
              </Button>
            </Navbar>
          }
          nextThemes={{ forcedTheme: 'light', defaultTheme: 'light' }}
          pageMap={pageMap}
          search={null}
          sidebar={{ toggleButton: false }}
          toc={{
            backToTop: null,
            extraContent: (
              <Anchor
                className="xy-link-gray text-xs font-medium"
                href="https://xyflow.com/contact"
              >
                Question? Give us feedback
              </Anchor>
            ),
          }}
        >
          {children}
        </Layout>
      </body>
    </Html>
  );
};

export default RootLayout;
