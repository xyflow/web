import { getPageMap as getExamplesPageMap } from '@/app/(content-pages)/examples/[...slug]/utils';
import { SidebarTitle } from 'xy-shared';
import { Folder, MdxFile, MetaJsonFile } from 'nextra';
import { getPageMap } from 'nextra/page-map';

export const normalizePageMap = async () => {
  const pageMap = (await getPageMap()).slice();
  console.log({ pageMap });
  // Add badges
  const apiReference = pageMap.find(
    (item): item is Folder => 'children' in item && item.name === 'api-reference',
  );
  console.log(1, apiReference);
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
      ...examples.slice(0, -1), // Exclude /examples/pro page
      ...catchAllExamples,
      examples.at(-1)!, // Move /examples/pro to the end of sidebar
    ],
  };

  const components = pageMap.find(
    (item): item is Folder => 'children' in item && item.name === 'ui',
  );
  console.log(2, components);
  console.log(3, catchAllExamples);
  const folders = [
    ...apiReference!.children,
    ...components!.children,
    ...catchAllExamples,
  ].filter((item): item is Folder<MdxFile> => 'children' in item);

  for (const folder of folders) {
    // First filter out hidden items
    folder.children = folder.children
      .filter((item: MdxFile) => {
        // Skip items where frontMatter.hidden is true
        return !('frontMatter' in item && item.frontMatter?.hidden === true);
      })
      .map((item: MdxFile & { title: string }) => ({
        ...item,
        title:
          typeof item.title === 'string' ? (
            <SidebarTitle frontMatter={item.frontMatter!} title={item.title} />
          ) : (
            item.title
          ),
      }));
  }

  return pageMap;
};
