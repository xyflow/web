import { Metadata } from 'next';
import { FC } from 'react';
import { ShowcaseItem, ShowcaseLayout } from 'xy-shared';
import showcaseItems from './showcases.json';

export const metadata: Metadata = {
  title: 'Showcase',
  description: 'Projects and examples using Svelte Flow',
};

const Page: FC = async () => {
  const showcases = showcaseItems as unknown as ShowcaseItem[];

  return (
    <ShowcaseLayout
      title="Built with Svelte Flow"
      subtitle="Svelte Flow is being used in a large variety of projects. Explore some of our favorite examples from the web."
      showcases={showcases}
    />
  );
};

export default Page;
