import type { NextraMetadata } from 'nextra';
import { ProExamplesMarketing } from 'xy-shared/components/pro/ProExamplesMarketing';

export const revalidate = 0;

export const metadata: NextraMetadata = {
  title: 'Pro Examples',
  description:
    'Advanced React Flow code examples to use in your node-based UIs, crafted by the React Flow core team.',
};

export default async function ProExamplesPage() {
  return <ProExamplesMarketing />;
}
