/* eslint react/jsx-sort-props: 'error' */
import { FC, ReactNode } from 'react';
import Link from 'next/link';
import { getPageMap } from 'nextra/page-map';
import { Layout, Navbar } from 'nextra-theme-docs';
import { Button, Footer, Logo, Text } from '@xyflow/xy-ui';
import { Anchor } from 'nextra/components';

export const NextraLayout: FC<{
  children: ReactNode;
}> = async ({ children }) => {
  const pageMap = await getPageMap();
  return (
    <Layout
      darkMode={false}
      docsRepositoryBase="https://github.com/xyflow/web/tree/main/sites/xyflow.com"
      editLink="Edit this page on GitHub"
      feedback={{ content: null }}
      footer={
        <Footer
          baseUrl="https://xyflow.com"
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
            className="xy-link-gray x:text-xs x:font-medium"
            href="https://xyflow.com/contact"
          >
            Question? Give us feedback
          </Anchor>
        ),
      }}
    >
      {children}
    </Layout>
  );
};
