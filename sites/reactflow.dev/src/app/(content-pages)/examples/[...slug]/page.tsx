import { notFound } from 'next/navigation';
import {
  convertToPageMap,
  mergeMetaWithPageMap,
  normalizePageMap,
} from 'nextra/page-map';
import { Folder, PageMapItem } from 'nextra';

import { meta } from './config';
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

export const [generatedExamplesPage] = _pageMap;

const examplesPageMap = mergeMetaWithPageMap(
  generatedExamplesPage as Folder<PageMapItem>,
  meta,
);

export const pageMap = normalizePageMap(examplesPageMap);

type PageProps = Readonly<{
  params: Promise<{
    slug: string[];
  }>;
}>;

export default async function Page(props: PageProps) {
  const params = await props.params;
  const route = params.slug.join('/');
  const result = await evaluateRoute(route, mdxPages);

  if (!result) {
    notFound();
  }

  const { default: MDXContent, toc, metadata } = result;

  return (
    <Wrapper toc={toc} metadata={metadata}>
      {/* @ts-expect-error -- false positive */}
      <H1>{metadata.title}</H1>
      <MDXContent />
    </Wrapper>
  );
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const route = params.slug.join('/');
  const result = await evaluateRoute(route, mdxPages);
  return result.metadata;
}

export function generateStaticParams() {
  const params = Object.keys(mdxPages).map((route) => ({
    slug: route.split('/'),
  }));

  return params;
}
