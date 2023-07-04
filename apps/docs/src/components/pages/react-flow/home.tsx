import { useSSG } from 'nextra/ssg';

import { Button } from 'xy-ui';
import BaseLayout from '@/layouts/base';
import HeroSection from '@/components/hero-section';

export default function ReactFlowHome() {
  const { stars, downloads } = useSSG();

  return (
    <BaseLayout>
      <HeroSection
        title="Wire Your Ideas with React Flow"
        subtitle="A customizable React component for building node-based editors and interactive diagrams"
      />
      <div>Stars: {stars}</div>
      <div>Downloads: {downloads}</div>

      <Button variant="react">React Flow</Button>
    </BaseLayout>
  );
}
