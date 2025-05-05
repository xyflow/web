import path from 'path';
import { Callout, Cards } from 'nextra/components';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { Button } from '@xyflow/xy-ui';
import { RemoteCodeViewer, getAllExamples } from 'xy-shared/server';

import { useMDXComponents as getMDXComponents } from '@/mdx-components';
import ProExampleViewer from '@/components/pro-example-viewer';
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
  const { default: MDXContent, toc, metadata } = require(
    // The static analyzer needs to know the import path as precisely as possible.
    // To achieve this, we keep `examples/` in the import path.
    `@/../../apps/example-apps/react/examples/${route.replace('/examples/', '')}/README.mdx`,
  );

  return (
    <Wrapper toc={toc} metadata={metadata}>
      <H1>{metadata.title}</H1>
      <MDXContent
        components={{
          Callout,
          Cards,
          ArrowTopRightOnSquareIcon,
          RemoteCodeViewer,
          ProExampleViewer,
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
  const examplesPath = path.resolve('../../apps/example-apps/react/examples');
  const filePaths = await getAllExamples(examplesPath);
  const params = filePaths.map((route) => ({ slug: route.split('/') }));
  return params;
}
