import type { NextraMetadata } from 'nextra';

import ProExamples from './pro-examples';

export const revalidate = 86400; // 60 * 60 * 24

export const metadata: NextraMetadata = {
  title: 'Pro Examples',
  description:
    'Advanced React Flow code examples to use in your node-based UIs, crafted by the React Flow core team.',
};

export default ProExamples;
