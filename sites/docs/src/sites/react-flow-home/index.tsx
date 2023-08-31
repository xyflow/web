import Link from 'next/link';
import Image from 'next/image';
import { useSSG } from 'nextra/ssg';
import { SparklesIcon } from '@heroicons/react/24/outline';

import { Button, Heading, Text } from 'xy-ui';
import BaseLayout from '@/layouts/base';
import HeroFlow from '@/page-sections/hero-flow';
import Stats, { StatsDisplay } from '@/page-sections/stats';
import Features from '@/page-sections/features';
import Showcase from '@/page-sections/showcase-overview';
import Section from '@/page-sections/section';
import GettingStarted from '@/page-sections/getting-started';
import ClientLogos from '@/components/client-logos';

import FlowA from './flows/flow-a';
import FlowB from './flows/flow-b';
import FlowC from './flows/flow-c';

const features = [
  {
    title: 'Ready out-of-the-box',
    text: 'The things you need are already there: dragging nodes, zooming, panning, selecting multiple nodes, and adding/removing elements are all built-in.',
    route: '/react-flow/docs',
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
    route: '/react-flow/docs',
    flowComponent: FlowB,
  },
  {
    title: 'All the right plugins',
    text: 'Make more advanced apps with the Background, Minimap, Controls, Panel, NodeToolbar, and NodeResizer components.',
    route: '/react-flow/docs',
    flowComponent: FlowC,
  },
];

const showcases = [
  {
    name: 'Stripe Docs',
    text: 'Diagrams for process documentation with interactive nodes',
    content: (
      <Image
        className="rounded-xl object-cover"
        src="/img/showcase/5e7c4463-7dc9-40e9-b3df-7433f6fc9abc.png"
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
        src="/img/showcase/8b4e2243-4e88-40be-89b8-4bfad13460f8.png"
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
        src="/img/showcase/0e29d66b-142b-42c4-a43c-6e3f6501d14b.png"
        alt="TypeForm"
        fill
      />
    ),
  },
];

export default function ReactFlowHome() {
  const {
    stars = 16000,
    downloads = 4000,
    usedBy = -1,
    contributors = -1,
  } = useSSG();

  return (
    <BaseLayout>
      <HeroFlow />

      <Section className="mt-6 lg:mt-10">
        <Stats
          variant="react"
          stats={[
            { label: 'Github Stars', value: `${(stars / 1000).toFixed(1)}k` },
            {
              label: 'Weekly Installs',
              value: `${(downloads / 1000).toFixed(0)}k`,
            },
            { label: 'License', value: 'MIT' },
          ]}
          description="React Flow is a MIT-licensed open source library. You can help us to ensure the further development and maintenance by subscribing to React Flow Pro."
          link="/react-flow/pro"
          linkLabel={
            <>
              <SparklesIcon className="w-5 h-5 mr-1" /> React Flow Pro
            </>
          }
        />
      </Section>

      <GettingStarted />

      <Section>
        <Features features={features} variant="react" />
      </Section>

      <Section>
        <ClientLogos />
      </Section>

      <Showcase items={showcases} />

      <Section className="lg:flex place-content-between">
        <div className="lg:max-w-2xl">
          <Heading size="md" className="font-bold mb-6">
            Join our community
          </Heading>
          <Text className="mt-2 mb-8 text-xl leading-relaxed">
            We&apos;re nice to each other over here on the React Flow corner of
            the internet. People from around the world, of all backgrounds,
            genders, and experience levels are welcome and respected equally.
            Read our Code of Conduct for more. Black lives matter. Trans rights
            are human rights. No nazi bullsh*t.
          </Text>
          <Button asChild className="mr-4">
            <Link href="/">Join our Discord</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Read our Code of Conduct</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 mt-10 lg:mt-0 ">
          {[
            {
              label: 'Used By',
              value: `${(usedBy / 1000).toFixed(1)}k`,
            },
            {
              label: 'Weekly Installs',
              value: `${(downloads / 1000).toFixed(0)}k`,
            },
            { label: 'Contributors', value: `${contributors}` },
            { label: 'Haters', value: '0' },
          ].map((s) => (
            <StatsDisplay
              key={`${s.label}-${s.value}`}
              variant="react"
              className="mb-6 lg:ml-20 !text-left"
              {...s}
            />
          ))}
        </div>
      </Section>
    </BaseLayout>
  );
}
