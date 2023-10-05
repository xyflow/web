import { UserGroupIcon } from '@heroicons/react/24/outline';

import { BaseLayout, Heading, Text } from 'xy-ui';
import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/page-sections/hero';
import Section from '@/page-sections/section';

import ossImage from '@/../public/img/open-source/thincrustopencore.png';
import starChart from '@/../public/img/open-source/starchart.png';

export default function OpenSource() {
  return (
    <BaseLayout>
      <Hero
        kicker="Open Source"
        kickerIcon={UserGroupIcon}
        title="Open Source at xyflow"
        subtitle="How and why we keep xyflow transparent, free, and MIT licensed"
        align="center"
      />

      <Section className="max-w-screen-md mx-auto mt-12 lg:my-12">
        <Image
          src={starChart}
          alt=""
          placeholder="blur"
          className="mx-auto lg:max-w-[544px] mt-2"
        ></Image>
        <Heading as="h2" size="sm" className="mb-4 mt-14">
          Open source since the beginning
        </Heading>
        <Text className="text-lg leading-8">
          We decided to open source the React Flow library in 2019. We started
          seeing our first users, receiving lots of bug reports and
          contributions early on, which allowed us to grow. More and more
          companies and people started to use it, which led to more maintenance
          work, to the point that we decided to shift our full attention to the
          library in 2021. A few months later, we set up a business model to
          support our ongoing work on the library. Now we’re happy maintainers
          of one of the most popular node-based UI libraries :)
        </Text>

        <Heading as="h2" size="sm" className="mb-4 mt-14">
          We’ll keep our software MIT Licensed forever.
        </Heading>
        <Text className="text-lg leading-8 mb-4">
          We chose the MIT License because we believe in Free and Open Source
          Software. Having this license means that anyone can use, repurpose, or
          resell our docs, our blog posts, or our library. We love that it
          allows anyone to use xyflow for their own projects, and we get to see
          people build things with xyflow that we never would have imagined. The
          MIT License also allows companies to easily use the library without
          having to hire a lawyer to interpret a custom license. We’ll keep our
          software MIT Licensed forever.
        </Text>
        <Link
          href="https://github.com/wbkd/react-flow/blob/main/LICENSE"
          className="text-pink-500 underline text-lg "
        >
          Read our license
        </Link>

        <Heading as="h2" size="sm" className="mb-4 mt-14">
          How we fund our work
        </Heading>
        <Text className="text-lg leading-8">
          We need funding to pay for the time it takes to care for xyflow and
          the infrastructure around it. The way we do this is a thin-crust
          open-core model:
        </Text>
        <Image
          src={ossImage}
          alt="A diagram showing a circle with an outline. Inside the circle is the Free, Open Core, which contains Libraries, docs, examples, and discord. The thick outline of the circle is the Paid Crust, containing Pro examples, prioritized bug fixes, and email support."
          placeholder="blur"
          className="my-10 mx-auto lg:max-w-[544px] "
        ></Image>

        <Text className="text-lg leading-8 mb-4">
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
        <Link
          href="/blog/asking-for-money-for-open-source"
          className="text-pink-500 underline text-lg"
        >
          More about how xyflow is funded
        </Link>
        <Heading as="h2" size="sm" className="mb-4 mt-14">
          Supporting the open source ecosystem
        </Heading>
        <Text className="text-lg leading-8 mb-4">
          We give back to the Open Source projects that we use ourselves on{' '}
          <Link
            href="https://opencollective.com/webkid"
            className="text-pink-500"
          >
            Open Collective
          </Link>{' '}
          and{' '}
          <Link href="https://github.com/wbkd" className="text-pink-500">
            Github
          </Link>
          .
        </Text>
        <Text className="text-lg leading-8 mb-4">
          We offer free access to our Pro examples to non-commercial open source
          projects and students who use xyflow. If this is you, send us an email
          to info@xyflow.dev from your student email, or send us a link to your
          open source project repository.
        </Text>
      </Section>
    </BaseLayout>
  );
}
