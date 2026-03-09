import { cache, type ReactElement } from 'react';
import { SidebarTitle } from '../components/sidebar-title';
import { Folder, MdxFile } from 'nextra';
import { getPageMap } from 'nextra/page-map';

export function createNormalizePageMap() {
  const $normalizePageMap = async () => {
    const pageMap = (await getPageMap()).slice();
    // Add badges
    const apiReference = pageMap.find(
      (item): item is Folder => 'children' in item && item.name === 'api-reference',
    );
    const examples = pageMap.find(
      (item): item is Folder => 'children' in item && item.name === 'examples',
    );

    // Check for both 'ui' (React Flow) and 'components' (Svelte Flow) folders
    const components = pageMap.find(
      (item): item is Folder =>
        'children' in item && (item.name === 'ui' || item.name === 'components'),
    );

    const folders = [
      ...apiReference!.children,
      ...examples!.children,
      ...(components?.children || []),
    ].filter((item): item is Folder<MdxFile> => 'children' in item);

    for (const folder of folders) {
      // First filter out hidden items
      folder.children = folder.children
        .filter((item: MdxFile) => {
          // Skip items where frontMatter.hidden is true
          return 'frontMatter' in item && item.frontMatter?.hidden !== true;
        })
        .map((item: MdxFile) => {
          const itemWithTitle = item as MdxFile & { title?: string | ReactElement };
          return {
            ...item,
            title:
              typeof itemWithTitle.title === 'string' ? (
                <SidebarTitle
                  frontMatter={item.frontMatter!}
                  title={itemWithTitle.title}
                />
              ) : (
                itemWithTitle.title
              ),
          };
        });
    }

    return pageMap;
  };

  // Cache result of a page map on dynamic routes e.g. `/pro/dashboard`
  return cache($normalizePageMap);
}
