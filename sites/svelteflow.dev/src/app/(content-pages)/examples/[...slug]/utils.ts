import path from 'path';
import fg from 'fast-glob';
import { Folder, PageMapItem } from 'nextra';
import {
  convertToPageMap,
  mergeMetaWithPageMap,
  normalizePageMap,
} from 'nextra/page-map';

import { meta } from './config';

export async function getAllExamples(): Promise<string[]> {
  const examplesPath = path.resolve('../../apps/example-apps/svelte/examples');
  const result = await fg(
    [
      '**/README.mdx',
      '!**/misc/overview/README.mdx', // ignore because we need to put it in `examples/overview`
    ],
    {
      cwd: examplesPath,
    },
  );
  return result.map((filePath) => filePath.replace('/README.mdx', ''));
}

export async function getPageMap(): Promise<Folder> {
  const filePaths = await getAllExamples();
  const { pageMap: _pageMap } = convertToPageMap({
    filePaths,
    basePath: 'examples',
  });
  const examplesPageMap = mergeMetaWithPageMap(_pageMap[0], meta);
  const pageMap = normalizePageMap(examplesPageMap);
  return addFrontMatter(pageMap);
}

function addFrontMatter(item: PageMapItem) {
  if ('children' in item) {
    return {
      ...item,
      children: item.children.map((i) => addFrontMatter(i)),
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

export function importMetadata(route: string) {
  const result = require(
    // The static analyzer needs to know the import path as precisely as possible.
    // To achieve this, we keep `examples/` in the import path.
    `@/../../apps/example-apps/svelte/examples/${route.replace('/examples/', '')}/README.mdx?metadata`,
  );
  return result.metadata;
}
