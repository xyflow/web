import { useSSG } from 'nextra/ssg';

import { Button } from 'xy-ui';
import BaseLayout from '@/layouts/base';
import HeroSection from '@/components/hero-section';
import Stats from '@/components/stats';

export default function ReactFlowHome() {
  const { stars, downloads } = useSSG();

  return (
    <BaseLayout>
      <HeroSection
        title="Wire Your Ideas with React Flow"
        subtitle="A customizable React component for building node-based editors and interactive diagrams"
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
    </BaseLayout>
  );
}
