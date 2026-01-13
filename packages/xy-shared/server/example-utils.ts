import fg from 'fast-glob';
import { DynamicMeta, Folder, PageMapItem } from 'nextra';
import {
  convertToPageMap,
  mergeMetaWithPageMap,
  normalizePageMap,
} from 'nextra/page-map';

export async function getAllExamples(examplesPath: string): Promise<string[]> {
  const result = await fg(
    [
      '**/README.mdx',
      '!**/misc/overview/README.mdx',
      '!**/misc/feature-overview/README.mdx', // ignore because we need to put it in `examples/overview`
    ],
    {
      cwd: examplesPath,
    },
  );

  return result.map((filePath) => filePath.replace('/README.mdx', ''));
}

export async function getExamplesPageMap(
  examplesPath: string,
  meta: DynamicMeta,
  importMetadata: (route: string) => DynamicMeta,
): Promise<Folder> {
  const filePaths = await getAllExamples(examplesPath);
  // If is run during runtime in a pro-platform, files from `app/examples` are not available
  if (!filePaths.length) {
    return {
      name: 'examples',
      route: '/examples',
      children: [{ data: {} }],
      // @ts-expect-error -- ignore
      title: 'Examples',
    };
  }
  const { pageMap: _pageMap } = convertToPageMap({
    filePaths,
    basePath: 'examples',
  });
  const examplesPageMap = mergeMetaWithPageMap(_pageMap[0], meta);
  const pageMap = normalizePageMap(examplesPageMap);
  return addFrontMatter(pageMap, importMetadata) as Folder;
}

function addFrontMatter(
  item: PageMapItem,
  importMetadata: (route: string) => DynamicMeta,
): PageMapItem {
  if ('children' in item) {
    return {
      ...item,
      children: item.children.map((i) => addFrontMatter(i, importMetadata)),
    };
  }
  if ('name' in item) {
    return {
      ...item,
      frontMatter: importMetadata(item.route),
    };
  }
  return item;
}
