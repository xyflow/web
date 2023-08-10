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

const features = [
  {
    title: 'Ready out-of-the-box',
    text: 'The things you need are already there: dragging nodes, zooming, planning, selecting multiple nodes, and adding/removing edges are all built-in.',
    route: '/react-flow/docs',
  },
  {
    title: 'Powered by us. Designed by you.',
    text: 'We play nice with Tailwind and old CSS. React Flow nodes are just React components. Create custom nodes to add interactive controls.',
    route: '/react-flow/docs',
  },
  {
    title: 'Ready for business',
    text: 'Build with confidence. React Flow is written entirely in TypeScript. A comprehensive suite of Cypress tests helps us never miss a bug.',
    route: '/react-flow/docs',
  },
  {
    title: 'All the right plugins',
    text: 'Make more advanced apps. Background, Minimap, Controls, Panel, Nodetoolbar, and Noderesizer.',
    route: '/react-flow/docs',
  },
];

const showcases = [
  {
    name: 'Stripe Docs',
    text: 'Diagrams for process documentation with interactive nodes',
    content: (
      <Image
        className="rounded-xl"
        src="/img/showcase/5e7c4463-7dc9-40e9-b3df-7433f6fc9abc.png"
        alt="Stripe Docs"
        objectFit="cover"
        fill
      />
    ),
  },
  {
    name: 'DoubleLoop',
    text: 'Node-based dashboard builder to monitor business metrics',
    content: (
      <Image
        className="rounded-xl"
        src="/img/showcase/8b4e2243-4e88-40be-89b8-4bfad13460f8.png"
        alt="DoubleLoop"
        objectFit="cover"
        fill
      />
    ),
  },
  {
    name: 'TypeForm',
    text: 'Interactive tool to build and visualize complex survey logic',
    content: (
      <Image
        className="rounded-xl"
        src="/img/showcase/0e29d66b-142b-42c4-a43c-6e3f6501d14b.png"
        alt="TypeForm"
        objectFit="cover"
        fill
      />
    ),
  },
];

export default function ReactFlowHome() {
  const { stars = 16000, downloads = 4000 } = useSSG();

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
        <div>
          <Heading size="md" className="font-bold">
            Some headline thing
          </Heading>
          <Text className="mt-2 mb-4">
            Here is a text about ethical standards and stuff
          </Text>
          <Button asChild>
            <Link href="/">Not sure</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 mt-10 lg:mt-0">
          {[
            { label: 'Github Stars', value: `${(stars / 1000).toFixed(1)}k` },
            {
              label: 'Weekly Installs',
              value: `${(downloads / 1000).toFixed(0)}k`,
            },
            { label: 'License', value: 'MIT' },
            { label: 'License', value: 'MITs' },
          ].map((s) => (
            <StatsDisplay
              key={`${s.label}-${s.value}`}
              variant="react"
              className="mb-6 lg:ml-20"
              {...s}
            />
          ))}
        </div>
      </Section>
    </BaseLayout>
  );
}
