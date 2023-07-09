import BaseLayout from '@/layouts/base';
import HeroSection from '@/components/hero-section';
import FeatureSection from '@/components/feature-section';

const features = [
  {
    title: 'Ready out-of-the-box',
    text: 'The things you need are already there: dragging nodes, zooming, planning, selecting multiple nodes, and adding/removing edges are all built-in.',
    route: '/svelte-flow/docs',
  },
  {
    title: 'Powered by us. Designed by you.',
    text: 'We play nice with Tailwind and old CSS. Svelte Flow nodes are just Svelte components. Create custom nodes to add interactive controls.',
    route: '/svelte-flow/docs',
  },
  {
    title: 'Ready for business',
    text: 'Build with confidence. Svelte Flow is written entirely in TypeScript. A comprehensive suite of Cypress tests helps us never miss a bug.',
    route: '/svelte-flow/docs',
  },
];

export default function SvelteFlowHome() {
  return (
    <BaseLayout>
      <HeroSection
        title={
          <>
            Wire Your Ideas with{' '}
            <span className="text-svelte">Svelte Flow</span>
          </>
        }
        subtitle="A customizable Svelte component for building node-based editors and interactive diagrams"
        size="md"
      />

      <FeatureSection
        features={features}
        className="mt-16 lg:mt-24"
        variant="svelte"
      />
    </BaseLayout>
  );
}
