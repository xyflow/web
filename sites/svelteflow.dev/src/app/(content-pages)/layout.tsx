/* eslint react/jsx-sort-props: 'error' */
import { FC, ReactNode } from 'react';
import { getPageMap } from 'nextra/page-map';
import { Folder, MdxFile, MetaJsonFile } from 'nextra';
import { defaultFooterCategories } from 'xy-shared';

import { NextraLayout } from '@/components/nextra-layout';
import { getPageMap as getExamplesPageMap } from '../../app/(content-pages)/examples/[...slug]/utils';

const Layout: FC<{
  children: ReactNode;
}> = async ({ children }) => {
  const pageMap = [...(await getPageMap())];
  const { Projects: _, ...remainingCategories } = defaultFooterCategories;
  const apiReference = pageMap.find(
    (item): item is Folder => 'children' in item && item.name === 'api-reference',
  );
  const examplesIndex = pageMap.findIndex(
    (item): item is Folder => 'name' in item && item.name === 'examples',
  );
  const [examplesMeta, ...examples] = (pageMap[examplesIndex] as Folder).children;

  const [catchAllExamplesMeta, ...catchAllExamples] = (await getExamplesPageMap())
    .children;
  // Merge on disk examples with examples from catch-all [...slug] route
  pageMap[examplesIndex] = {
    ...pageMap[examplesIndex],
    children: [
      {
        // Merge meta records
        data: {
          ...(examplesMeta as MetaJsonFile).data,
          ...(catchAllExamplesMeta as MetaJsonFile).data,
        },
      },
      ...examples,
      ...catchAllExamples,
    ],
  };

  const folders = [...apiReference!.children, ...catchAllExamples].filter(
    (item): item is Folder<MdxFile> => 'children' in item,
  );

  for (const folder of folders) {
    // First filter out hidden items
    folder.children = folder.children.filter((item: MdxFile) => {
      // Skip items where frontMatter.hidden is true
      return !('frontMatter' in item && item.frontMatter?.hidden === true);
    });
  }

  const categories = {
    Docs: [
      { title: 'Quickstart Guide', route: '/learn' },
      { title: 'API Reference', route: '/api-reference' },
      { title: 'Examples', route: '/examples' },
      { title: 'Showcase', route: '/showcase' },
      { title: 'Support Us', route: '/support-us' },
    ],
    ...remainingCategories,
    Legal: [
      {
        title: 'MIT License',
        route: 'https://github.com/xyflow/xyflow/blob/main/LICENSE',
      },
      {
        title: 'Code of Conduct',
        route: 'https://github.com/xyflow/xyflow/blob/main/CODE_OF_CONDUCT.md',
      },
    ],
  };

  return (
    <NextraLayout footerCategories={categories} pageMap={pageMap}>
      {children}
    </NextraLayout>
  );
};

export default Layout;
