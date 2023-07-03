import BaseLayout from '@/layouts/base';
import HeroSection from '@/components/hero-section';
import PricingTable from '@/components/pricing-table';
import ShowcaseOverview from '@/components/showcase-overview';

export default function ReactFlowPro() {
  return (
    <BaseLayout>
      <HeroSection
        title="Build Better Node-Based UIs with React Flow"
        subtitle="Thanks for checking out React Flow Pro! We are Christopher, Hayleigh, John, and Moritz, and we are the team building and maintaining React Flow"
        kicker="React Flow Pro"
      >
        <p className="mt-4 mb-2">
          React Flow is open-source MIT-licensed software, and it will be
          forever. Our library enables thousands of solo developers and
          organizations like Stripe and Linkedin to build their node-based apps.
          With so many active users, it takes time and effort to maintain the
          library, docs, and community. We can’t do that without your support.
        </p>
        <p>
          Why Subscribe? With your subscription, you are ensuring the
          sustainable maintenance and development of the React Flow library.
          This is how we make sure React Flow stays MIT-licensed. In return, you
          get a high-quality, maintained, updated library, along with benefits
          like direct support, prioritized feature requests, and access to our
          Pro Examples.
        </p>
      </HeroSection>

      <PricingTable />

      <ShowcaseOverview />
    </BaseLayout>
  );
}
