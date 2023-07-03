import { Button } from 'xy-ui';
import BaseLayout from '@/layouts/base';
import HeroSection from '@/components/hero-section';

export default function SvelteFlowHome() {
  return (
    <BaseLayout>
      <HeroSection>
        Svelte Flow <Button variant="svelte">Svelte Flow</Button>
      </HeroSection>
    </BaseLayout>
  );
}
