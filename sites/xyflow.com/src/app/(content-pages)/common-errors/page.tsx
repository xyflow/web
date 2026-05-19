import { type Metadata } from 'next';
import { BaseLayout, Hero } from 'xy-shared';
import { Section } from '@xyflow/xy-ui';

import CommonErrors from '@/mdx/common-errors.mdx';

export const metadata: Metadata = {
  title: 'Common Errors',
  description:
    'Troubleshooting and fixes for common issues with React Flow and Svelte Flow.',
};

export default function Page() {
  return (
    <BaseLayout>
      <Hero
        kicker="Troubleshooting"
        title="Common Errors"
        subtitle="Warnings, errors, and common pitfalls when using React Flow or Svelte Flow"
        align="center"
      />
      <Section className="max-w-screen-md mx-auto mt-12 lg:my-12">
        <CommonErrors />
      </Section>
    </BaseLayout>
  );
}
