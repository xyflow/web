import Image from 'next/image';
import { PricingTable } from 'xy-shared/components/pricing-table';
import { Section } from 'xy-shared/components/ui/section';
import { FAQ } from 'xy-shared/components/faq';
import { default as reactFlowProFaqItems } from 'xy-shared/components/faq/items/react-flow-pro';
import { BaseLayout } from 'xy-shared/layouts/base';
import { Hero } from 'xy-shared/components/hero';
import { ImageSlider } from 'xy-shared/components/image-slider';
import { SubscribeSection } from 'xy-shared/components/subscribe-section';
import { LiteYouTubeEmbed } from 'xy-shared/components/liteyoutube-embed';
import { SparklesIcon } from '@heroicons/react/24/outline';

import ClientLogos from 'xy-shared/components/client-logos';
import { NextraMetadata } from 'nextra';
import { SignUpButton } from 'xy-shared/components/pro/SignUpButton';

import zapier from '../../../../public/img/clients/zapier.svg';
import stripe from '../../../../public/img/clients/stripe.svg';
import carto from '../../../../public/img/clients/carto.svg';
import railway from '../../../../public/img/clients/railway.svg';
import retool from '../../../../public/img/clients/retool.svg';
import doubleloop from '../../../../public/img/clients/doubleloop.svg';
import onesignal from '../../../../public/img/clients/onesignal.svg';
import close from '../../../../public/img/clients/close.svg';

export const metadata: NextraMetadata = {
  asIndexPage: true,
  title: 'React Flow Pro',
  description:
    'Subscribe to React Flow Pro to get access to exclusive features of React Flow, a highly customizable library for building node-based editors, interactive graphs and flow charts',
};

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
            Build Better Node-Based UIs with <br />
            <span className="text-primary">React Flow Pro</span>
          </>
        }
        subtitle="Get advanced code examples, technical support, and help funding our development — while keeping the library open source and under the MIT license."
        kicker="React Flow Pro"
        kickerIcon={<SparklesIcon />}
        action={<SignUpButton className="inline-flex" showIcon />}
        backgroundVariant="image"
      >
        <p className="mt-4 mb-2">
          <strong>React Flow is open-source MIT-licensed software</strong>, and it will be
          forever. Our libraries enable thousands of solo developers and organizations
          like Stripe and Linkedin to build their node-based apps. With so many active
          users, it takes time and effort to maintain the library, docs, and community. We
          can’t do that without your support.
        </p>
        <p>
          <strong>Why Subscribe?</strong> With your subscription, you are ensuring the
          sustainable maintenance and development of the React Flow library. This is how
          we make sure React Flow stays MIT-licensed. In return, you get a high-quality,
          maintained, updated library, along with benefits like direct support,
          prioritized feature requests, and access to our Pro Examples.
        </p>
      </Hero>

      <PricingTable className="mt-6 lg:mt-10" />

      <Section className="relative z-1">
        <ClientLogos
          title="React Flow Pro is used by"
          logos={[
            { src: zapier, alt: 'zapier', className: 'h-7' },
            { src: stripe, alt: 'stripe', className: 'h-7' },
            { src: carto, alt: 'carto workflows', className: 'h-9' },
            { src: close, alt: 'close', className: 'h-7' },
            { src: railway, alt: 'railway', className: 'h-9' },
            { src: retool, alt: 'retool', className: 'h-6' },
            { src: doubleloop, alt: 'doubleloop', className: 'h-7' },
            { src: onesignal, alt: 'onesignal', className: 'h-7' },
          ]}
        />
      </Section>

      <ImageSlider
        kicker="Case studies"
        title="See what our subscribers build"
        description="React Flow Pro subscribers use pro examples, prioritized issues, and support to build advanced workflow builders, node-based editors, and diagramming tools."
        buttonText="See all case studies"
        buttonLink="/pro/case-studies"
        items={sliderItems}
        className="relative z-1"
      />

      <FAQ items={reactFlowProFaqItems} className="mt-32">
        <LiteYouTubeEmbed
          id="jm_UoZXEEnU"
          title="React Flow Pro plans"
          style={{ aspectRatio: '16 / 9', width: '100%' }}
          poster="sddefault"
        />
      </FAQ>
      <SubscribeSection btnLink="/pro/sign-up" btnLabel="Sign Up Now" />
    </BaseLayout>
  );
}
