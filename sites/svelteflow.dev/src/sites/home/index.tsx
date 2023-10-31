import Link from 'next/link';
import { useSSG } from 'nextra/ssg';
import { HeartIcon, BoltIcon } from '@heroicons/react/24/outline';
import {
  BaseLayout,
  Button,
  AboutSection,
  ImageSlider,
  HeroFlow,
  Section,
  Features,
  GettingStarted,
  Stats,
  ProjectCards,
} from 'xy-ui';

import FlowA from './flows/flow-a';
import FlowB from './flows/flow-b';
import FlowC from './flows/flow-c';

import IframePreview from '@/components/example-viewer/iframe-preview';

import aboutImage from '../../../public/img/about.jpg';
import type { InternalRoute } from '@/utils';

const sliderItems = [
  {
    name: 'Feature Overview',
    text: 'Many features of Svelte Flow require zero configuration',
    content: (
      <IframePreview
        className="rounded-xl overflow-hidden pointer-events-none"
        path="examples/feature-overview"
      />
    ),
  },
  {
    name: 'Subflows',
    text: 'Svelte Flow supports nested graphs out of the box',
    content: (
      <IframePreview
        className="rounded-xl overflow-hidden pointer-events-none"
        path="examples/layout/subflows"
      />
    ),
  },
  {
    name: 'Edge Types',
    text: 'The component comes with a set of common edge types',
    content: (
      <IframePreview
        className="rounded-xl overflow-hidden pointer-events-none"
        path="examples/edges/edge-types"
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
    flowComponent: FlowA,
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
    route: '/learn/guides/custom-nodes' satisfies InternalRoute,
    linkLabel: 'Custom nodes guide',
    flowComponent: FlowB,
  },
  {
    title: 'All the right plugins',
    text: 'Make more advanced apps with the Background, Minimap, Controls, and Panel components.',
    route: '/learn' satisfies InternalRoute,
    flowComponent: FlowC,
  },
];

export default function SvelteFlowHome() {
  const { downloads = 450 } = useSSG();

  return (
    <BaseLayout>
      <HeroFlow
        title="Svelte Flow"
        initialColor="#ff4000"
        subtitle="A customizable Svelte component for building node-based editors and interactive diagrams by the creators of React Flow"
        action={
          <div className="flex">
            <Button asChild className="mr-3" size="lg">
              <Link href="/learn">
                <BoltIcon className="w-5 h-5 mr-1" />
                Quickstart
              </Link>
            </Button>
            <Button variant="pro" asChild size="lg">
              <Link href="/support-us">
                <HeartIcon className="w-5 h-5 mr-1" /> Support Us
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
              value: process.env.NEXT_PUBLIC_SVELTE_FLOW_VERSION,
            },
            {
              label: 'Weekly Installs',
              value:
                downloads >= 1000
                  ? `${(downloads / 1000).toFixed(0)}k`
                  : downloads,
            },
            { label: 'License', value: 'MIT' },
          ]}
          description="Svelte Flow is a MIT-licensed open source library. You can help us to ensure the further development and maintenance by supporting us."
          link="/support-us"
          linkLabel={
            <>
              <HeartIcon className="w-5 h-5 mr-1" /> Support Us
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
}
