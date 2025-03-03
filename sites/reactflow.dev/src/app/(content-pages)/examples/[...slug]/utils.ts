import { readFile } from 'fs/promises';
import path from 'path';
import fg from 'fast-glob';
import { Folder, PageMapItem } from 'nextra';
import {
  convertToPageMap,
  mergeMetaWithPageMap,
  normalizePageMap,
} from 'nextra/page-map';
import { compileMdx } from 'nextra/compile';
import { Callout, Cards, Tabs } from 'nextra/components';
import { evaluate } from 'nextra/evaluate';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import ProExampleViewer from '@/components/pro-example-viewer';
import { RemoteCodeViewer } from 'xy-shared/server/remote-code-viewer';
import { useMDXComponents as getMDXComponents } from '@/mdx-components';
import { meta } from './config';

export async function getAllExamples(): Promise<string[]> {
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

export async function getPageMap(): Folder {
  const filePaths = await getAllExamples();

  const { mdxPages, pageMap: _pageMap } = convertToPageMap({
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
    const result = require(
      // The static analyzer needs to know the import path as precisely as possible.
      // To achieve this, we keep `examples/` in the import path.
      `../../../../../../../apps/example-apps/react/examples/${item.route.replace('/examples/', '')}/README.mdx?metadata`,
    );
    return {
      ...item,
      frontMatter: result.metadata,
    };
  }
  return item;
}

const examplesPath = path.resolve('../../apps/example-apps/react/examples');

export const {
  wrapper: Wrapper,
  h1: H1,
  ...components
} = getMDXComponents({
  $Tabs: Tabs,
  Callout,
  Cards,
  ArrowTopRightOnSquareIcon,
  RemoteCodeViewer,
  ProExampleViewer,
});

export async function evaluateRoute(route: string) {
  const rawMdx = await readFile(
    path.resolve(examplesPath, route, 'README.mdx'),
    'utf8',
  );
  const rawJs = await compileMdx(rawMdx);
  return evaluate(rawJs, components);
}
