import Link from 'next/link';
import { Button } from 'xy-ui';
import { SparklesIcon } from '@heroicons/react/24/outline';

import BaseLayout from '@/layouts/base';
import Hero from '@/page-sections/hero';
import PricingTable from '@/page-sections/pricing-table';
import ClientLogos from '@/components/client-logos';
import ShowcaseSlider from '@/page-sections/showcase-overview';
import FAQ from '@/components/faq';
import Section from '@/page-sections/section';

import { PRO_PLATFORM_SIGNUP_URL } from '@/constants';

export default function ReactFlowPro() {
  return (
    <BaseLayout>
      <Hero
        title={
          <>
            Build Better Node-Based UIs with{' '}
            <span className="text-react">React Flow</span>
          </>
        }
        subtitle="Thanks for checking out React Flow Pro! We are Christopher, Hayleigh, John, and Moritz, and we are the team building and maintaining React Flow"
        kicker="React Flow Pro"
        action={
          <Button asChild size="lg" variant="react-pro">
            <Link href={PRO_PLATFORM_SIGNUP_URL}>
              <SparklesIcon className="w-5 h-5 mr-2" /> Get Started
            </Link>
          </Button>
        }
      >
        <p className="mt-4 mb-2">
          <strong>React Flow is open-source MIT-licensed software</strong>, and
          it will be forever. Our library enables thousands of solo developers
          and organizations like Stripe and Linkedin to build their node-based
          apps. With so many active users, it takes time and effort to maintain
          the library, docs, and community. We can’t do that without your
          support.
        </p>
        <p>
          <strong>Why Subscribe?</strong> With your subscription, you are
          ensuring the sustainable maintenance and development of the React Flow
          library. This is how we make sure React Flow stays MIT-licensed. In
          return, you get a high-quality, maintained, updated library, along
          with benefits like direct support, prioritized feature requests, and
          access to our Pro Examples.
        </p>
      </Hero>

      <PricingTable className="mt-6 lg:mt-10" />

      <Section>
        <ClientLogos />
      </Section>

      <ShowcaseSlider />

      <FAQ className="mt-20" />
    </BaseLayout>
  );
}
