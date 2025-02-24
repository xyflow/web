import { notFound } from 'next/navigation';
import {
  convertToPageMap,
  mergeMetaWithPageMap,
  normalizePageMap,
} from 'nextra/page-map';
import { Folder, PageMapItem } from 'nextra';

import { ExamplesOverview } from '@/components/examples-overview';
import { meta, metadata as configMetadata } from './config';
import { evaluateRoute, generateFilePaths, H1, Wrapper } from './utils';

const filePaths = generateFilePaths(meta);

// @TODO: the returned pageMap doesn't include frontMatter
// how can we pass this information to convertToPageMap or somewhere else?
// we need the frontMatter in layout.tsx in order to render the badges for
// the sidebar items.
const { mdxPages, pageMap: _pageMap } = convertToPageMap({
  filePaths,
  basePath: 'examples',
});

export const generatedExamplesPage = _pageMap;
export const generatedExampleMeta = meta;
const examplesPageMap = mergeMetaWithPageMap(
  generatedExamplesPage[0] as Folder<PageMapItem>,
  meta,
);

export const pageMap = normalizePageMap(examplesPageMap);

type PageProps = Readonly<{
  params: Promise<{
    slug?: string[];
  }>;
}>;

export default async function Page(props: PageProps) {
  const params = await props.params;
  const route = params.slug?.join('/') ?? '';

  // the index page is special because it doesn't show a specific example
  // but an overview of all examples.
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

  const result = await evaluateRoute(route, mdxPages);

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

  const result = await evaluateRoute(route, mdxPages);

  return result?.metadata ?? {};
}

export function generateStaticParams() {
  const params = Object.keys(mdxPages).map((route) => ({
    slug: route.split('/'),
  }));

  return params;
}
