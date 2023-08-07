import { UserGroupIcon } from '@heroicons/react/24/outline';

import { Heading, Text } from 'xy-ui';
import BaseLayout from '@/layouts/base';
import Hero from '@/page-sections/hero';
import Section from '@/page-sections/section';

export default function OpenSource() {
  return (
    <BaseLayout>
      <Hero
        kicker="Open Source"
        kickerIcon={UserGroupIcon}
        title="Contribute and help grow React Flow and Svelte Flow"
        subtitle="React Flow was published under an MIT License in 2019."
        align="center"
      />

      <Section>
        <Heading as="h2" size="sm">
          We’ll keep our software MIT Licensed forever.
        </Heading>
        <Text>
          We chose the MIT License because we believe in Free and Open Source
          Software. Having this license means that anyone can use, repurpose, or
          resell our docs, our blog posts, or our library. We love that it
          allows anyone to use xyFlow for their own projects, and we get to see
          people build things with xyFlow that we never would have imagined. The
          MIT License also allows companies to easily use the library without
          having to hire a lawyer to interpret a custom license.
        </Text>

        <Heading as="h2" size="sm" className="mt-10 lg:mt-14">
          We need funding to pay for the time it takes to care
        </Heading>
        <Text>
          We spend most of our time on the “core,” which is MIT Licensed
          (library, docs, github discussions, discord). We spend less time on
          the “crust,” which is the paid content and services (subscriber
          support, pro examples)– these are handled by our Terms of Use instead
          of the MIT License. This model allows us to decide the direction of
          the library (no investors), the core library remains free for
          everyone, and the financial burden of the library and ecosystem around
          it is placed on organizations who can afford to fund us (rather than
          individual developers).
        </Text>
      </Section>
    </BaseLayout>
  );
}
