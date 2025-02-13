import { FC, ReactNode } from 'react';
import { Folder, MdxFile } from 'nextra';
import { getPageMap } from 'nextra/page-map';
import { NextraLayout } from '@/components/nextra-layout';
import { SidebarTitle } from 'xy-shared';
import { defaultFooterCategories } from '@xyflow/xy-ui';

const Layout: FC<{ children: ReactNode }> = async ({ children }) => {
  const { Projects: _, ...remainingCategories } = defaultFooterCategories;
  const pageMap = await getPageMap();

  // Add badges
  const apiReference = pageMap.find(
    (item): item is Folder =>
      'children' in item && item.name === 'api-reference',
  );
  const examples = pageMap.find(
    (item): item is Folder => 'children' in item && item.name === 'examples',
  );
  const folders = [...apiReference.children, ...examples.children].filter(
    (item): item is Folder<MdxFile> => 'children' in item,
  );

  for (const folder of folders) {
    folder.children = folder.children.map(
      (item: MdxFile & { title: string }) => ({
        ...item,
        title:
        // On dev somehow we can have duplicate badges without this check
          typeof item.title === 'string' ? (
            <SidebarTitle frontMatter={item.frontMatter} title={item.title} />
          ) : (
            item.title
          ),
      }),
    );
  }
  return <NextraLayout pageMap={pageMap} footerCategories={{
    Docs: [
      { title: 'Getting Started', route: '/learn' },
      { title: 'API Reference', route: '/api-reference' },
      { title: 'Examples', route: '/examples' },
      { title: 'Showcase', route: '/showcase' },
    ],
    ...remainingCategories,
    Legal: [
      {
        title: 'MIT License',
        route: 'https://github.com/xyflow/xyflow/blob/main/LICENSE',
      },
      {
        title: 'Code of Conduct',
        route:
          'https://github.com/xyflow/xyflow/blob/main/CODE_OF_CONDUCT.md',
      },
      { title: 'Imprint', route: 'https://xyflow.com/imprint' },
    ],
  }}>{children}</NextraLayout>
}

export default Layout
