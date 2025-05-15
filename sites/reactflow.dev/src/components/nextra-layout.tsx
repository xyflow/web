/* eslint react/jsx-sort-props: 'error' */
import { ComponentProps, FC, ReactNode } from 'react';
import { PageMapItem } from 'nextra';
import { Layout } from 'nextra-theme-docs';
import { Footer as XYFooter } from '@xyflow/xy-ui';
import { TOC, getLastChangelog } from 'xy-shared/server';
import { Navbar } from './navbar';

export const NextraLayout: FC<{
  children: ReactNode;
  pageMap: PageMapItem[];
  footerCategories: ComponentProps<typeof XYFooter>['categories'];
  navbar?: ReactNode;
}> = async ({ children, pageMap, footerCategories, navbar }) => {
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
      navbar={<Navbar>{navbar}</Navbar>}
      nextThemes={{ forcedTheme: 'light', defaultTheme: 'light' }}
      pageMap={pageMap}
      // Set to null to avoid rendering search in mobile nav, since we added search in navbar already
      search={null}
      sidebar={{ toggleButton: false }}
      toc={{
        backToTop: null,
        extraContent: <TOC pageMap={await getLastChangelog()} />,
      }}
    >
      {children}
    </Layout>
  );
};
