import Link from 'next/link';
import { HeartIcon, BoltIcon } from '@heroicons/react/24/outline';
import {
  BaseLayout,
  Button,
  Heading,
  HeroFlow,
  Section,
  Features,
  GettingStarted,
  Stats,
} from 'xy-ui';

import FlowA from './flows/flow-a';
import FlowB from './flows/flow-b';
import FlowC from './flows/flow-c';

import SupportSection from '@/components/support-section';

const features = [
  {
    title: 'Ready out-of-the-box',
    text: 'The things you need are already there: dragging nodes, zooming, panning, selecting multiple nodes, and adding/removing edges are all built-in.',
    route: '/learn',
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
    text: 'We play nice with Tailwind and old CSS. Svelte Flow nodes are just Svelte components. Create custom nodes to add interactive controls.',
    route: '/learn',
    flowComponent: FlowB,
  },
  {
    title: 'All the right plugins',
    text: 'Make more advanced apps with the Background, Minimap, Controls, Panel, NodeToolbar, and NodeResizer components.',
    route: '/learn',
    flowComponent: FlowC,
  },
];

export default function SvelteFlowHome() {
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
            { label: 'Latest Release', value: 'May 23' },
            {
              label: 'Weekly Installs',
              value: 5,
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

      <GettingStarted
        libraryName="Svelte Flow"
        packageName="@xyflow/svelte-flow"
      />

      <Section>
        <Features features={features} />
      </Section>

      <SupportSection />
    </BaseLayout>
  );
}
