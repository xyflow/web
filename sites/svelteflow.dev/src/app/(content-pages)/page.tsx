import { FC } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BoltIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { Button, Section, Stats } from 'xy-shared';
import {
  BaseLayout,
  AboutSection,
  ImageSlider,
  HeroFlow,
  Features,
  GettingStarted,
  ProjectCards,
  FlowA,
  FlowB,
  FlowC,
} from 'xy-shared';

import type { InternalRoute } from '../../routes';
import { fetchGitHubNpmStats } from 'xy-shared/utils';
import { version } from '@xyflow/svelte/package.json';

export const revalidate = 3600; // 60 * 60

export const metadata: Metadata = {
  title: 'The Node-Based UI for Svelte',
  description:
    'A customizable Svelte component for building node-based editors and interactive diagrams',
};

const sliderItems = [
  {
    name: 'Feature Overview',
    text: 'Many features of Svelte Flow require zero configuration',
    content: (
      <iframe
        src={`${process.env.NEXT_PUBLIC_EXAMPLES_URL}/svelte/examples/misc/feature-overview/index.html`}
        loading="lazy"
        width="100%"
        height="100%"
        className="rounded-xl overflow-hidden pointer-events-none"
      />
    ),
  },
  {
    name: 'Subflows',
    text: 'Svelte Flow supports nested graphs out of the box',
    content: (
      <iframe
        src={`${process.env.NEXT_PUBLIC_EXAMPLES_URL}/svelte/examples/layout/subflows/index.html`}
        loading="lazy"
        width="100%"
        height="100%"
        className="rounded-xl overflow-hidden pointer-events-none"
      />
    ),
  },
  {
    name: 'Edge Types',
    text: 'The component comes with a set of common edge types',
    content: (
      <iframe
        src={`${process.env.NEXT_PUBLIC_EXAMPLES_URL}/svelte/examples/edges/edge-types/index.html`}
        loading="lazy"
        width="100%"
        height="100%"
        className="rounded-xl overflow-hidden pointer-events-none"
      />
    ),
  },
];

const features = [
  {
    title: 'Ready out-of-the-box',
    text: 'The things you need are already there: dragging nodes, zooming, panning, selecting multiple nodes, and adding/removing edges are all built-in.',
    route: '/learn' satisfies InternalRoute,
    linkLabel: 'Get started',
    flowComponent: <FlowA />,
  },
  {
    title: (
      <>
        Powered by us.
        <br />
        Designed by you.
      </>
    ),
    text: 'We play nice with Tailwind and good old CSS. Svelte Flow nodes are just Svelte components. Create custom nodes to have full control with interactive components.',
    route: '/learn/customization/custom-nodes' satisfies InternalRoute,
    linkLabel: 'Custom nodes guide',
    flowComponent: <FlowB />,
  },
  {
    title: 'All the right components',
    text: 'Make more advanced apps with the Background, Minimap, Controls, and Panel components.',
    route: '/learn' satisfies InternalRoute,
    flowComponent: <FlowC framework="svelte" />,
  },
];

const Page: FC = async () => {
  const { downloads = 450 } = await fetchGitHubNpmStats('svelte');

  return (
    <BaseLayout>
      <HeroFlow
        title="Svelte Flow"
        initialColor="#ff4000"
        subtitle="A customizable Svelte component for building node-based editors and interactive diagrams"
        action={
          <div className="flex">
            <Button asChild className="mr-3" size="lg">
              <Link href="/learn">
                <BoltIcon className="w-5 h-5 mr-1" />
                Quickstart
              </Link>
            </Button>
            <Button size="lg" variant="pro" asChild>
              <Link href="/pro">
                <SparklesIcon className="w-5 h-5 mr-1" /> Svelte Flow Pro
              </Link>
            </Button>
          </div>
        }
      />

      <Section className="mt-6 lg:mt-10">
        <Stats
          stats={[
            {
              label: 'Current Version',
              value: version,
            },
            {
              label: 'Weekly Installs',
              value: downloads >= 1000 ? `${(downloads / 1000).toFixed(0)}K` : downloads,
            },
            { label: 'License', value: 'MIT' },
          ]}
          description="Svelte Flow is a MIT-licensed open source library. You can help us to ensure the further development and maintenance by subscribing to React Flow Pro."
          link="/pro"
          linkLabel={
            <>
              <SparklesIcon className="w-5 h-5 mr-1" /> Svelte Flow Pro
            </>
          }
        />
      </Section>

      <GettingStarted libraryName="Svelte Flow" packageName="@xyflow/svelte" />

      <Section>
        <Features features={features} />
      </Section>

      <ImageSlider
        kicker="Interactive Examples"
        title="See Svelte Flow in action"
        buttonText="See all examples"
        buttonLink="/examples"
        description="To see all the capabilities of Svelte Flow, check out the interactive examples which are regularly updated."
        items={sliderItems}
      />

      <AboutSection />

      <ProjectCards projects={['reactflow', 'xyflow']} />
    </BaseLayout>
  );
};

export default Page;
