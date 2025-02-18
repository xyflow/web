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
    theme: {
      breadcrumb: false,
    },
  },
  overview: '',
};

for (let category of exampleCategories) {
  exampleMeta[category] = {
    title: category,
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

const genRefPageMap = mergeMetaWithPageMap(generatedExamplesPage, {
  index: {
    theme: {
      breadcrumb: false,
    },
  },
  overview: '',
  ...exampleMeta,
});

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

export default async function Page(props: PageProps) {
  const params = await props.params;
  const route = params.slug?.join('/') ?? '';
  const filePath = mdxPages[route];

  if (!filePath) {
    notFound();
  }

  const readmeContent = await readFile(
    resolve(examplesPath, route, 'README.mdx'),
    'utf-8',
  );
  const rawJs = await compileMdx(readmeContent, { filePath });
  const {
    default: MDXContent,
    toc,
    metadata,
  } = evaluate(rawJs, { ...components, RemoteCodeViewer });

  return (
    <Wrapper toc={toc} metadata={metadata}>
      <>
        <H1>{metadata.title}</H1>
        <MDXContent />
      </>
    </Wrapper>
  );
}

export function generateStaticParams() {
  const params = Object.keys(mdxPages).map((route) => ({
    slug: route.split('/'),
  }));

  return params;
}
