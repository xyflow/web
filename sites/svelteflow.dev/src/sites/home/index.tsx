import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/24/outline';
import { BaseLayout, Button, Heading } from 'xy-ui';
import HeroFlow from '@/page-sections/hero-flow';
import Features from '@/page-sections/features';
import Section from '@/page-sections/section';
import Stats from '@/page-sections/stats';
import GettingStarted from '@/page-sections/getting-started';

import FlowA from './flows/flow-a';
import FlowB from './flows/flow-b';
import FlowC from './flows/flow-c';

const features = [
  {
    title: 'Ready out-of-the-box',
    text: 'The things you need are already there: dragging nodes, zooming, panning, selecting multiple nodes, and adding/removing edges are all built-in.',
    route: '/svelte-flow/docs',
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
    route: '/svelte-flow/docs',
    flowComponent: FlowB,
  },
  {
    title: 'All the right plugins',
    text: 'Make more advanced apps with the Background, Minimap, Controls, Panel, NodeToolbar, and NodeResizer components.',
    route: '/svelte-flow/docs',
    flowComponent: FlowC,
  },
];

export default function SvelteFlowHome() {
  return (
    <BaseLayout>
      <HeroFlow />

      <Section className="mt-6 lg:mt-10">
        <Stats
          variant="svelte"
          stats={[
            { label: 'Latest Release', value: 'May 23' },
            {
              label: 'Weekly Installs',
              value: 5,
            },
            { label: 'License', value: 'MIT' },
          ]}
          description="Svelte Flow is a MIT-licensed open source library. You can help us to ensure the further development and maintenance by supporting us."
          link="/svelte-flow/support"
          linkLabel={
            <>
              <HeartIcon className="w-5 h-5 mr-1" /> Support Us
            </>
          }
        />
      </Section>

      <GettingStarted />

      <Section>
        <Features features={features} variant="svelte" />
      </Section>

      <Section className="mx-auto lg:max-w-[800px] lg:mb-8">
        <Heading size="md" as="h3" className="text-center mb-12 mt-32">
          Get started with Svelte Flow and join the community of people building
          node-based UIs
        </Heading>

        <div className="flex justify-center space-x-8">
          <Button size="lg" asChild variant="svelte">
            <Link href="/react-flow/pro" className="flex items-center">
              Read the Docs
            </Link>
          </Button>
          <Button size="lg" asChild variant="secondary">
            <Link href="/react-flow/pro" className="flex items-center">
              Join our Discord
            </Link>
          </Button>
        </div>
      </Section>
    </BaseLayout>
  );
}
