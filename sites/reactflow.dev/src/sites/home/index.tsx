import Link from 'next/link';
import Image from 'next/image';
import { useSSG } from 'nextra/ssg';
import { Button, Section, Stats } from '@xyflow/xy-ui';
import {
  BaseLayout,
  HeroFlow,
  ImageSlider,
  Features,
  GettingStarted,
  AboutSection,
  ProjectCards,
} from 'xy-shared';
import { SparklesIcon, BoltIcon } from '@heroicons/react/24/outline';
import ClientLogos from '@/components/client-logos';

import FlowA from './flows/flow-a';
import FlowB from './flows/flow-b';
import FlowC from './flows/flow-c';

import type { InternalRoute } from '@/utils';
import WhatsNewPreview from '@/components/whats-new-preview';

const features = [
  {
    title: 'Ready out-of-the-box',
    text: 'The things you need are already there: dragging nodes, zooming, panning, selecting multiple nodes, and adding/removing elements are all built-in.',
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
    text: 'React Flow nodes are simply React components, ready for your interactive elements. We play nice with Tailwind and plain old CSS.',
    route: '/learn/customization/custom-nodes' satisfies InternalRoute,
    linkLabel: 'Custom nodes guide',
    flowComponent: FlowB,
  },
  {
    title: 'All the right plugins',
    text: 'Make more advanced apps with the Background, Minimap, Controls, Panel, NodeToolbar, and NodeResizer components.',
    route: '/learn/concepts/plugin-components' satisfies InternalRoute,
    flowComponent: FlowC,
  },
];

const sliderItems = [
  {
    name: 'Stripe Docs',
    text: 'Diagrams for process documentation with interactive nodes',
    content: (
      <Image
        className="rounded-xl object-cover"
        src="/img/featured/stripe.png"
        alt="Stripe Docs"
        fill
      />
    ),
  },
  {
    name: 'DoubleLoop',
    text: 'Node-based dashboard builder to monitor business metrics',
    content: (
      <Image
        className="rounded-xl object-cover"
        src="/img/featured/doubleloop.png"
        alt="DoubleLoop"
        fill
      />
    ),
  },
  {
    name: 'TypeForm',
    text: 'Interactive tool to build and visualize complex survey logic',
    content: (
      <Image
        className="rounded-xl object-cover"
        src="/img/featured/typeform.png"
        alt="TypeForm"
        fill
      />
    ),
  },
];

export default function ReactFlowHome() {
  const { stars = 16000, downloads = 4000, whatsNew = [] } = useSSG();

  return (
    <BaseLayout>
      <HeroFlow
        title="React Flow"
        initialColor="#ff0071"
        subtitle="A customizable React component for building node-based editors and interactive diagrams"
        action={
          <div className="flex">
            <Button size="lg" asChild className="mr-3 ">
              <Link href="/learn">
                <BoltIcon className="w-5 h-5 mr-1" />
                Quickstart
              </Link>
            </Button>
            <Button size="lg" variant="pro" asChild>
              <Link href="/pro">
                <SparklesIcon className="w-5 h-5 mr-1" /> React Flow Pro
              </Link>
            </Button>
          </div>
        }
      />

      <Section className="mt-6 lg:mt-10">
        <Stats
          stats={[
            { label: 'Github Stars', value: `${(stars / 1000).toFixed(1)}k` },
            {
              label: 'Weekly Installs',
              value: `${(downloads / 1000).toFixed(0)}k`,
            },
            { label: 'License', value: 'MIT' },
          ]}
          description="React Flow is a MIT-licensed open source library. You can help us to ensure the further development and maintenance by subscribing to React Flow Pro."
          link="/pro"
          linkLabel={
            <>
              <SparklesIcon className="w-5 h-5 mr-1" /> React Flow Pro
            </>
          }
        />
      </Section>

      <GettingStarted libraryName="React Flow" packageName="reactflow" />

      <Section>
        <Features features={features} />
      </Section>

      <Section>
        <ClientLogos />
      </Section>

      <ImageSlider items={sliderItems} />

      <Section className="relative">
        <WhatsNewPreview items={whatsNew} variant="compact" />
        <div className="lg:hidden h-[50%] w-full bg-gradient-to-b from-transparent via-white/70 to-white absolute bottom-0 pointer-events-none" />
      </Section>

      <AboutSection />
      <ProjectCards projects={['svelteflow', 'xyflow']} />
    </BaseLayout>
  );
}
