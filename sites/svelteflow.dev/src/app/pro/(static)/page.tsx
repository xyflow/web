import { PricingTable, Section, FAQ, svelteFlowProFaqItems } from 'xy-shared';
import { BaseLayout, Hero, SubscribeSection, LiteYouTubeEmbed } from 'xy-shared';
import { SparklesIcon } from '@heroicons/react/24/outline';

// import ClientLogos from '@/components/client-logos';
import { NextraMetadata } from 'nextra';
import { SignUpButton } from '@/app/(content-pages)/examples/pro/pro-page';

export const metadata: NextraMetadata = {
  asIndexPage: true,
  title: 'Svelte Flow Pro',
  description:
    'Subscribe to Svelte Flow Pro to get access to exclusive features of Svelte Flow, a highly customizable library for building node-based editors, interactive graphs and flow charts',
};

export default function SvelteFlowPro() {
  return (
    <BaseLayout>
      <Hero
        title={
          <>
            Build Better Node-Based UIs with <br />
            <span className="text-primary">Svelte Flow Pro</span>
          </>
        }
        subtitle="Get advanced code examples, technical support, and help funding our development — while keeping the library open source and under the MIT license."
        kicker="Svelte Flow Pro"
        kickerIcon={<SparklesIcon />}
        action={<SignUpButton className="inline-flex" showIcon />}
        backgroundVariant="image"
      >
        <p className="mt-4 mb-2">
          <strong>Svelte Flow is open-source MIT-licensed software</strong>, and it will
          be forever. Our library enables thousands of solo developers and organizations
          like Stripe and Linkedin to build their node-based apps. With so many active
          users, it takes time and effort to maintain the library, docs, and community. We
          can’t do that without your support.
        </p>
        <p>
          <strong>Why Subscribe?</strong> With your subscription, you are ensuring the
          sustainable maintenance and development of the Svelte Flow library. This is how
          we make sure Svelte Flow stays MIT-licensed. In return, you get a high-quality,
          maintained, updated library, along with benefits like direct support,
          prioritized feature requests, and access to our Pro Examples.
        </p>
      </Hero>

      <PricingTable className="mt-6 lg:mt-10" />

      <FAQ items={svelteFlowProFaqItems} className="mt-32"></FAQ>
      <SubscribeSection btnLink="/pro/sign-up" btnLabel="Sign Up Now" />
    </BaseLayout>
  );
}
