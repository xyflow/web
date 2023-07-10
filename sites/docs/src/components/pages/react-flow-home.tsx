import Link from 'next/link';
import { useSSG } from 'nextra/ssg';
import { SparklesIcon } from '@heroicons/react/24/outline';

import { Button, Heading, Text } from 'xy-ui';
import BaseLayout from '@/layouts/base';
import HeroSection from '@/components/hero-section';
import Stats, { StatsDisplay } from '@/components/stats';
import Features from '@/components/features';
import Showcase from '@/components/showcase-overview';
import Section from '@/components/section';
import GettingStarted from '@/components/getting-started';

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

export default function ReactFlowHome() {
  const { stars, downloads } = useSSG();

  return (
    <BaseLayout>
      <HeroSection
        title={
          <>
            Wire Your Ideas with <span className="text-react">React Flow</span>
          </>
        }
        subtitle="A customizable React component for building node-based editors and interactive diagrams"
        size="md"
      />

      <Section>
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

      <Showcase />

      <Section className="lg:flex place-content-between">
        <div>
          <Heading size="lg" className="font-bold">
            Some headline thing
          </Heading>
          <Text className="mb-4 mt-2">
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
