import Link from 'next/link';
import Image from 'next/image';
import { Heading, Text, Section } from '@xyflow/xy-ui';
import { BaseLayout, Hero } from 'xy-shared';
import { UserGroupIcon } from '@heroicons/react/24/outline';

import ossImage from '@/../public/img/open-source/thincrustopencore.png';

export default function OpenSource() {
  return (
    <BaseLayout>
      <Hero
        kicker="Open Source"
        kickerIcon={<UserGroupIcon />}
        title="Open Source at xyflow"
        subtitle="How and why we keep xyflow transparent, free, and MIT licensed"
        align="center"
      />

      <Section className="max-w-screen-md mx-auto mt-12 lg:my-12">
        <Image
          src="https://api.star-history.com/svg?repos=xyflow/xyflow&type=Date"
          alt="xyflow GitHub Star History. The red line keeps going up and to the right, from 2021 until now."
          width={800}
          height={400}
        />

        <Heading as="h2" size="sm" className="mb-4 mt-14">
          Open source since the beginning
        </Heading>
        <Text className="text-lg leading-8">
          We gave the React Flow library an MIT license as soon as we built it
          in 2019. We were lucky to see it organically grow from there, and as
          more people and organizations used it, we wanted to spend more time
          taking care of the library and its ecosystem. In 2022, we set up a
          business model to support our ongoing work on the library and put our
          agency-style work to the side to focus on the library full-time. Since
          then, we&apos;ve been happy maintainers of one of the most popular
          node-based UI libraries.
        </Text>
        <Text className="text-lg leading-8 mt-8">
          We&apos;ve also released{' '}
          <Link
            href="https://svelteflow.dev"
            className="text-pink-500 text-lg "
          >
            Svelte Flow
          </Link>{' '}
          and our{' '}
          <Link
            href="https://github.com/xyflow/pro-platform/"
            className="text-pink-500 text-lg "
          >
            Pro Platform
          </Link>{' '}
          under an MIT License in the meantime, and you can expect the same from
          any projects in the future.
        </Text>

        <Heading as="h2" size="sm" className="mb-4 mt-14">
          We&apos;ll keep our software MIT Licensed forever
        </Heading>
        <Text className="text-lg leading-8 mb-4">
          We chose the{' '}
          <Link
            href="https://github.com/xyflow/xyflow/blob/main/LICENSE"
            className="text-pink-500 text-lg "
          >
            MIT License
          </Link>{' '}
          because we believe in Free and Open Source Software. Having this
          license means that anyone can use, repurpose, or resell our docs, our
          blog posts, or our library. We love that it allows anyone to use
          xyflow for their own projects, and we get to see people build things
          with xyflow that we never would have imagined. The MIT License also
          allows companies to easily use the library without having to hire a
          lawyer to interpret a custom license. We&apos;ll keep our software MIT
          Licensed forever.
        </Text>

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
        />

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
            href="https://opencollective.com/xyflow-org"
            className="text-pink-500"
          >
            Open Collective
          </Link>{' '}
          and{' '}
          <Link href="https://github.com/xyflow" className="text-pink-500">
            Github
          </Link>
          .
        </Text>
        <Text className="text-lg leading-8 mb-4">
          We offer free access to our Pro examples to non-commercial open source
          projects and students who use xyflow. If this is you, send us an email
          to info@xyflow.com from your student email, or send us a link to your
          open source project repository.
        </Text>
        <Text className="text-lg leading-8 mb-4">
          We want to share our learnings whenever we can. We conducted a survey
          with React Flow developers in 2023, and we shared the results publicly
          in an{' '}
          <Link
            href="https://reactflow.dev/developer-survey-2023"
            className="text-pink-500 text-lg "
          >
            interactive React Flow app
          </Link>{' '}
          and in a{' '}
          <Link
            href="/blog/react-flow-developer-survey-2023"
            className="text-pink-500 text-lg "
          >
            full-length blog post
          </Link>
          .
        </Text>
      </Section>
    </BaseLayout>
  );
}
