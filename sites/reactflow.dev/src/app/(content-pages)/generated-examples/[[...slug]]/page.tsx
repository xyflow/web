import { readdirSync } from 'fs';
import { readFile } from 'fs/promises';
import { join, resolve } from 'path';
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

import { useMDXComponents as getMDXComponents } from '../../../../mdx-components';
import { RemoteCodeViewer } from '@/components/remote-code-viewer';

const examplesPath = resolve(
  process.cwd(),
  '../../apps/example-apps/react/examples',
);

const exampleCategories = readdirSync(examplesPath);
const filePaths = ['index.mdx', 'overview.mdx'];
const exampleMeta = {
  index: {
    title: 'Examples',
    theme: {
      breadcrumb: false,
    },
  },
  overview: 'Feature Overview',
};

for (let category of exampleCategories) {
  exampleMeta[category] = {
    items: {},
  };

  const categoryPath = join(examplesPath, category);
  const examples = readdirSync(categoryPath);
  for (let example of examples) {
    filePaths.push(`${category}/${example}.mdx`);
    exampleMeta[category].items[example] = '';
  }
}

const { mdxPages, pageMap: _pageMap } = convertToPageMap({
  filePaths,
  basePath: 'generated-examples',
});

export const [generatedExamplesPage] = _pageMap;
export const generatedExampleMeta = exampleMeta;
const genRefPageMap = mergeMetaWithPageMap(
  generatedExamplesPage as Folder<PageMapItem>,
  exampleMeta,
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

async function evaluateProps(props: PageProps) {
  const params = await props.params;
  const route = params.slug?.join('/') ?? '';
  const filePath = mdxPages[route];

  if (!filePath) {
    return false;
  }

  const readmeContent = await readFile(
    resolve(examplesPath, route, 'README.mdx'),
    'utf-8',
  );
  const rawJs = await compileMdx(readmeContent, { filePath });
  return evaluate(rawJs, { ...components, RemoteCodeViewer });
}

export default async function Page(props: PageProps) {
  const result = await evaluateProps(props);

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
  const result = await evaluateProps(props);

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
