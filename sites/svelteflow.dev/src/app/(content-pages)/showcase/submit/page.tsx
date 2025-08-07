import { RocketLaunchIcon } from '@heroicons/react/24/solid';
import { Metadata } from 'next';
import { FC } from 'react';
import { BaseLayout, Hero } from 'xy-shared';
import { ShowcaseForm } from 'xy-shared/components/showcase-form';

export const metadata: Metadata = {
  title: 'Submit a showcase',
  description: 'Submit your showcase to React Flow',
};

const Showcase: FC = async () => {
  return (
    <BaseLayout>
      <Hero
        kicker="Showcase"
        kickerIcon={<RocketLaunchIcon />}
        title="Submit your Svelte to React Flow"
        subtitle="Thank you for submitting your project to our showcase! Please note that by submitting a showcase here, it is not guaranteed that we will add your project. Accepted projects will appear on the Svelte Flow website."
        align="center"
        backgroundVariant="gradient"
      />
      <ShowcaseForm library="Svelte Flow" />
    </BaseLayout>
  );
};

export default Showcase;
