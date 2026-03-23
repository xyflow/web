import type { NextraMetadata } from 'nextra';
import { ProExamplesMarketing } from 'xy-shared/components/pro/ProExamplesMarketing';

export const metadata: NextraMetadata = {
  title: 'Pro Examples',
  description:
    'Advanced Svelte Flow code examples to use in your node-based UIs, crafted by the Svelte Flow core team.',
};

export default async function ProExamplesPage() {
  return <ProExamplesMarketing />;
}
