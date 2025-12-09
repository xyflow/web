import path from 'path';
import { Callout, Cards } from 'nextra/components';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { Button } from 'xy-shared';
import { RemoteCodeViewer, getAllExamples } from 'xy-shared/server';

import { useMDXComponents as getMDXComponents } from '@/mdx-components';
import { importMetadata } from './utils';

type PageProps = Readonly<{
  params: Promise<{
    slug: string[];
  }>;
}>;

const { wrapper: Wrapper, h1: H1 } = getMDXComponents();

export default async function Page(props: PageProps) {
  const params = await props.params;
  const route = params.slug.join('/');
  const { default: MDXContent, toc, metadata, sourceCode } = require(
    // The static analyzer needs to know the import path as precisely as possible.
    // To achieve this, we keep `examples/` in the import path.
    `private-next-root-dir/../../apps/example-apps/svelte/examples/${route.replace('/examples/', '')}/README.mdx`,
  );

  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <H1>{metadata.title}</H1>
      <MDXContent
        components={{
          Callout,
          Cards,
          ArrowTopRightOnSquareIcon,
          RemoteCodeViewer,
          Button,
        }}
      />
    </Wrapper>
  );
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const route = params.slug.join('/');
  return importMetadata(route);
}

export async function generateStaticParams() {
  const examplesPath = path.resolve('../../apps/example-apps/svelte/examples');
  const filePaths = await getAllExamples(examplesPath);
  const params = filePaths.map((route) => ({ slug: route.split('/') }));
  return params;
}
