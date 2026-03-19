import type { NextraMetadata } from 'nextra';
import { getSubscription } from 'xy-shared/server-actions/get-subscription';
import { ProExamplesOverview } from 'xy-shared/layouts/pro-examples-overview';
import { ProExamplesMarketing } from 'xy-shared/components/pro/ProExamplesMarketing';
import { useMDXComponents as getMdxComponents } from '@/mdx-components';

import { meta } from '../../(auth)/examples/config';

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
        <ProExamplesOverview meta={meta} />
      </Wrapper>
    );
  }

  return <ProExamplesMarketing />;
}
