import { readFile } from 'fs/promises';
import { resolve } from 'path';

import { compileMdx } from 'nextra/compile';
import { Callout, Tabs } from 'nextra/components';
import { evaluate } from 'nextra/evaluate';

import ProExampleViewer from '@/components/pro-example-viewer';
import { RemoteCodeViewer } from 'xy-shared/server/remote-code-viewer';
import { useMDXComponents as getMDXComponents } from '../../../../mdx-components';
import { mdxPathOverrides } from './config';

const examplesPath = resolve(
  process.cwd(),
  '../../apps/example-apps/react/examples',
);

export const generateFilePaths = (meta) =>
  Object.keys(meta).reduce<string[]>((res, item) => {
    if (meta[item].items) {
      Object.keys(meta[item].items).forEach((subItem) => {
        res.push(`${item}/${subItem}.mdx`);
      });
    } else {
      res.push(`${item}.mdx`);
    }

    return res;
  }, []);

export const {
  wrapper: Wrapper,
  h1: H1,
  ...components
} = getMDXComponents({
  $Tabs: Tabs,
  Callout,
});

export async function evaluateRoute(
  route: string,
  mdxPages: Record<string, string>,
) {
  const filePath = mdxPages[route];

  if (!filePath) {
    return false;
  }

  const _route = mdxPathOverrides[route] ?? route;
  const readmeContent = await readFile(
    resolve(examplesPath, _route, 'README.mdx'),
    'utf-8',
  );
  const rawJs = await compileMdx(readmeContent, { filePath });
  return evaluate(rawJs, { ...components, RemoteCodeViewer, ProExampleViewer });
}
