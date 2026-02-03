/* eslint react/jsx-sort-props: 'error' */
import { ComponentProps, FC, ReactNode } from 'react';
import { PageMapItem } from 'nextra';
import { Layout, Navbar } from 'nextra-theme-docs';
import { Footer as XYFooter, LogoLabel, Link } from '@xyflow/xy-ui';
import { TOC, getLastChangelog } from 'xy-shared/server';
import { Banner } from 'nextra/components';

export const NextraLayout: FC<{
  children: ReactNode;
  pageMap: PageMapItem[];
  footerCategories: ComponentProps<typeof XYFooter>['categories'];
  navbar: ReactNode;
}> = async ({ children, pageMap, footerCategories, navbar }) => {
  return (
    <Layout
      banner={
        <Banner storageKey="collaborative">
          <Link
            className="hover:underline x:focus-visible:nextra-focus text-sm"
            href="/examples/interaction/collaborative"
          >
            🎮 Updated Pro Example! Collaborative Flow Editor! 🌎
          </Link>
        </Banner>
      }
      darkMode={false}
      docsRepositoryBase="https://github.com/xyflow/web/tree/main/sites/reactflow.dev"
      editLink="Edit this page on GitHub"
      feedback={{ content: null }}
      footer={<XYFooter baseUrl="https://reactflow.dev" categories={footerCategories} />}
      navbar={
        <Navbar
          align="left"
          logo={<LogoLabel label="React Flow" labelClassName="mr-5 md:max-lg:hidden" />}
          logoLink={false}
        >
          {navbar}
        </Navbar>
      }
      nextThemes={{ forcedTheme: 'light', defaultTheme: 'light' }}
      pageMap={pageMap}
      // Set to null to avoid rendering search in mobile nav, since we added search in navbar already
      search={null}
      sidebar={{ toggleButton: false, defaultMenuCollapseLevel: 4 }}
      toc={{
        backToTop: null,
        extraContent: <TOC pageMap={await getLastChangelog()} />,
      }}
    >
      {children}
    </Layout>
  );
};
