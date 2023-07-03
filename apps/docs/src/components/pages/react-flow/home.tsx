import { useSSG } from 'nextra/ssg';

import { Button } from 'xy-ui';
import BaseLayout from '@/layouts/base';
import HeroSection from '@/components/hero-section';

export default function ReactFlowHome() {
  const { stars, downloads } = useSSG();

  return (
    <BaseLayout>
      <HeroSection>
        React Flow <Button variant="react">React Flow</Button>
        <div>Stars: {stars}</div>
        <div>Downloads: {downloads}</div>
      </HeroSection>
    </BaseLayout>
  );
}
