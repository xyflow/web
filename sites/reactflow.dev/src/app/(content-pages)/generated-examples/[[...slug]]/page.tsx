import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { notFound } from 'next/navigation';
import { compileMdx } from 'nextra/compile';
import { Callout, Tabs } from 'nextra/components';
import { evaluate } from 'nextra/evaluate';
import {
  convertToPageMap,
  mergeMetaWithPageMap,
  normalizePageMap,
} from 'nextra/page-map';
import { Folder, PageMapItem } from 'nextra';

import { RemoteCodeViewer } from 'xy-shared/server/remote-code-viewer';
import { ExamplesOverview } from '@/components/examples-overview';
import { useMDXComponents as getMDXComponents } from '../../../../mdx-components';
import { meta, metadata as configMetadata, mdxPathOverrides } from './config';

const examplesPath = resolve(
  process.cwd(),
  '../../apps/example-apps/react/examples',
);

const filePaths = Object.keys(meta).reduce<string[]>((res, item) => {
  if (meta[item].items) {
    Object.keys(meta[item].items).forEach((subItem) => {
      res.push(`${item}/${subItem}.mdx`);
    });
  } else {
    res.push(`${item}.mdx`);
  }

  return res;
}, []);

const { mdxPages, pageMap: _pageMap } = convertToPageMap({
  filePaths,
  basePath: 'generated-examples',
});

export const [generatedExamplesPage] = _pageMap;
export const generatedExampleMeta = meta;
const genRefPageMap = mergeMetaWithPageMap(
  generatedExamplesPage as Folder<PageMapItem>,
  meta,
);

export const pageMap = normalizePageMap(genRefPageMap);

const {
  wrapper: Wrapper,
  h1: H1,
  ...components
} = getMDXComponents({
  $Tabs: Tabs,
  Callout,
});

type PageProps = Readonly<{
  params: Promise<{
    slug?: string[];
  }>;
}>;

async function evaluateRoute(route: string) {
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
  return evaluate(rawJs, { ...components, RemoteCodeViewer });
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const route = params.slug?.join('/') ?? '';

  if (route === '') {
    return (
      <Wrapper toc={[]} metadata={configMetadata.index}>
        <H1>Examples</H1>
        Browse our examples for practical copy-paste solutions to common use
        cases with React Flow. Here you can find our MIT Licensed examples,
        which you are free to use in your projects without restrictions, as well
        as our Pro examples that come with our React Flow Pro subscription
        plans.
        <ExamplesOverview />
      </Wrapper>
    );
  }

  const result = await evaluateRoute(route);

  if (!result) {
    notFound();
  }

  const { default: MDXContent, toc, metadata } = result;

  return (
    <Wrapper toc={toc} metadata={metadata}>
      <H1>{metadata.title}</H1>
      <MDXContent />
    </Wrapper>
  );
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const route = params.slug?.join('/') ?? '';

  if (route === '') {
    return configMetadata.index;
  }

  const result = await evaluateRoute(route);

  if (!result) {
    return {};
  }

  return result.metadata;
}

export function generateStaticParams() {
  const params = Object.keys(mdxPages).map((route) => ({
    slug: route.split('/'),
  }));

  return params;
}
