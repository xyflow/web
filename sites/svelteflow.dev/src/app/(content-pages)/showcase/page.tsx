import { ShowcaseLayout } from 'xy-shared/layouts/showcase';
import { Metadata } from 'next';
import { fetchNotionShowcases } from 'xy-shared/server/utils';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Showcase',
  description: 'Projects and examples using Svelte Flow',
};

const Page: FC = async () => {
  const showcases = await fetchNotionShowcases('Svelte Flow');

  return (
    <ShowcaseLayout
      title="Built with Svelte Flow"
      subtitle="Svelte Flow is being used in a large variety of projects. Explore some of our favorite examples from the web."
      showcases={showcases}
    />
  );
};

export default Page;
