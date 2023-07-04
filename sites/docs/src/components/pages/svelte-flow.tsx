import { Button } from 'xy-ui';
import BaseLayout from '@/layouts/base';
import HeroSection from '@/components/hero-section';

export default function SvelteFlowHome() {
  return (
    <BaseLayout>
      <HeroSection
        title="Wire Your Ideas with Svelte Flow"
        subtitle="A customizable Svelte component for building node-based editors and interactive diagrams"
      />
      <Button variant="svelte">Svelte Flow</Button>
    </BaseLayout>
  );
}
