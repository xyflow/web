import type { NextraMetadata } from 'nextra';
import { getSubscription } from 'xy-shared/server-actions/get-subscription';
import { useMDXComponents as getMdxComponents } from '@/mdx-components';

import ProExamples from '../../(auth)/examples/logged-in';
import ProExamplesMarketing from '../../(auth)/examples/logged-out';

export const revalidate = 0;

export const metadata: NextraMetadata = {
  title: 'Pro Examples',
  description:
    'Advanced React Flow code examples to use in your node-based UIs, crafted by the React Flow core team.',
};

const { wrapper: Wrapper } = getMdxComponents();

export default async function ProExamplesPage() {
  const { user } = await getSubscription();

  if (user) {
    return (
      // @ts-expect-error -- we explicitly provide metadata as empty object
      <Wrapper toc={[]} metadata={{}}>
        <ProExamples />
      </Wrapper>
    );
  }

  return <ProExamplesMarketing />;
}
