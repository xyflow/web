/* eslint react/jsx-sort-props: 'error' */
import { ComponentProps, FC, ReactNode } from 'react';
import NextLink from 'next/link';
import { PageMapItem } from 'nextra';
import { Anchor } from 'nextra/components';
import { Layout, Navbar } from 'nextra-theme-docs';
import { Footer as XYFooter, LogoLabel } from '@xyflow/xy-ui';
import { getLastChangelog } from '@/utils';

const Toc: FC = async () => {
  const changelog = await getLastChangelog();
  return (
    <div className="grid gap-2 x:text-xs x:font-medium">
      <Anchor className="xy-link-gray" href="https://xyflow.com/contact">
        Question? Give us feedback
      </Anchor>
      <p className="font-bold mt-4">What&apos;s new?</p>
      {[...changelog, { route: '/whats-new', title: '...and more!' }]
        .slice(0, 3)
        .map(({ route, title }) => (
          <NextLink className="xy-link-gray" href={route} key={route}>
            {title}
          </NextLink>
        ))}
    </div>
  );
};

export const NextraLayout: FC<{
  children: ReactNode;
  pageMap: PageMapItem[];
  footerCategories: ComponentProps<typeof XYFooter>['categories'];
  navbar: ReactNode;
}> = ({ children, pageMap, footerCategories, navbar }) => {
  return (
    <Layout
      darkMode={false}
      docsRepositoryBase="https://github.com/xyflow/web/tree/main/sites/reactflow.dev"
      editLink="Edit this page on GitHub"
      feedback={{ content: null }}
      footer={
        <XYFooter
          baseUrl="https://reactflow.dev"
          categories={footerCategories}
        />
      }
      navbar={
        <Navbar
          align="left"
          logo={
            <LogoLabel
              label="React Flow"
              labelClassName="mr-5 md:max-lg:hidden"
            />
          }
          logoLink={false}
        >
          {navbar}
        </Navbar>
      }
      nextThemes={{ forcedTheme: 'light', defaultTheme: 'light' }}
      pageMap={pageMap}
      // Set to null to avoid rendering search in mobile nav, since we added search in navbar already
      search={null}
      sidebar={{ toggleButton: false }}
      toc={{ backToTop: null, extraContent: <Toc /> }}
    >
      {children}
    </Layout>
  );
};
