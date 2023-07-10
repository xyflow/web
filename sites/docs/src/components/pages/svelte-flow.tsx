import { HeartIcon } from '@heroicons/react/24/outline';

import BaseLayout from '@/layouts/base';
import HeroSection from '@/components/hero-section';
import Features from '@/components/features';
import Section from '@/components/section';
import Stats from '@/components/stats';
import GettingStarted from '@/components/getting-started';

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

      <Section>
        <Stats
          variant="svelte"
          stats={[
            { label: 'Latest Release', value: 'May 23' },
            {
              label: 'Weekly Installs',
              value: 5,
            },
            { label: 'License', value: 'MIT' },
          ]}
          description="Svelte Flow is a MIT-licensed open source library. You can help us to ensure the further development and maintenance by supporting us."
          link="/svelte-flow/support"
          linkLabel={
            <>
              <HeartIcon className="w-5 h-5 mr-1" /> Support Us
            </>
          }
        />
      </Section>

      <GettingStarted />

      <Section>
        <Features features={features} variant="svelte" />
      </Section>
    </BaseLayout>
  );
}
