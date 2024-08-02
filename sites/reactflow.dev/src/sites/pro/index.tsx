import Image from 'next/image';
import Link from 'next/link';
import { useSSG } from 'nextra/ssg';
import {
  Button,
  PricingTable,
  Section,
  FAQ,
  reactFlowProFaqItems,
} from '@xyflow/xy-ui';
import { BaseLayout, Hero, ImageSlider, SubscribeSection } from 'xy-shared';
import { SparklesIcon } from '@heroicons/react/24/outline';

import ClientLogos from '@/components/client-logos';

const sliderItems = [
  {
    name: 'DoubleLoop',
    text: 'Tracking business goals with React Flow-powered maps',
    content: (
      <Image
        className="rounded-xl object-cover"
        src="/img/case-studies/doubleloop-screenshot.png"
        alt="DoubleLoop"
        fill
      />
    ),
  },
  {
    name: 'OneSignal',
    text: 'Automating customer engagement with a workflow builder',
    content: (
      <Image
        className="rounded-xl object-cover"
        src="/img/case-studies/onesignal-screenshot.png"
        alt="TypeForm"
        fill
      />
    ),
  },
  {
    name: 'Carto',
    text: 'Spatial data analysis pipelines with a no-code pipeline editor',
    content: (
      <Image
        className="rounded-xl object-cover"
        src="/img/case-studies/carto-screenshot.png"
        alt="TypeForm"
        fill
      />
    ),
  },
];

export default function ReactFlowPro() {
  return (
    <BaseLayout>
      <Hero
        title={
          <>
            Build Better Node-Based UIs with{' '}
            <span className="text-primary">React Flow</span>
          </>
        }
        subtitle="Thanks for checking out React Flow Pro! We are Christopher, Hayleigh, John, Moritz, and Peter, and we are the team building and maintaining React Flow"
        kicker="React Flow Pro"
        kickerIcon={SparklesIcon}
        action={
          <Button asChild size="lg" variant="pro">
            <Link href={process.env.NEXT_PUBLIC_PRO_PLATFORM_URL}>
              <SparklesIcon className="w-5 h-5 mr-2" /> Get Started
            </Link>
          </Button>
        }
        backgroundVariant="gradient"
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
        <ClientLogos title="React Flow Pro is used by" />
      </Section>

      <ImageSlider
        kicker="Case studies"
        title="See what our subscribers build"
        description="React Flow Pro subscribers use pro examples, prioritized issues, and support to build advanced workflow builders, node-based editors, and diagramming tools."
        buttonText="See all case studies"
        buttonLink="/pro/case-studies"
        items={sliderItems}
      />

      <FAQ items={reactFlowProFaqItems} className="mt-32" />
      <SubscribeSection
        btnLink={`${process.env.NEXT_PUBLIC_PRO_PLATFORM_URL}/signup`}
        btnLabel="Sign Up Now"
      />
    </BaseLayout>
  );
}
