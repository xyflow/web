import { useSSG } from 'nextra/ssg';

import BaseLayout from '@/layouts/base';
import HeroSection from '@/components/hero-section';
import Stats from '@/components/stats';
import FeatureSection from '@/components/feature-section';

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
        linkLabel="React Flow Pro"
      />

      <FeatureSection
        features={features}
        className="mt-16 lg:mt-24"
        variant="react"
      />
    </BaseLayout>
  );
}
