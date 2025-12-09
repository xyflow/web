import path from 'path';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { Button } from 'xy-shared';
import { getAllExamples } from 'xy-shared/server';

import { useMDXComponents as getMDXComponents } from '@/mdx-components';
import { importMetadata } from './utils';

type Props = PageProps<'/examples/[...slug]'>;

const { wrapper: Wrapper, h1: H1 } = getMDXComponents();

export default async function Page(props: Props) {
  const params = await props.params;
  const route = params.slug.join('/');
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- `require` supports Fast Refresh
  const { default: MDXContent, toc, metadata, sourceCode } = require(
    // The static analyzer needs to know the import path as precisely as possible.
    // To achieve this, we keep `examples/` in the import path.
    `private-next-root-dir/../../apps/example-apps/react/examples/${route.replace('/examples/', '')}/README.mdx`,
  );

  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <H1>{metadata.title}</H1>
      <MDXContent components={{ ArrowTopRightOnSquareIcon, Button }} />
    </Wrapper>
  );
}

export async function generateMetadata(props: Props) {
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
