/* eslint react/no-unescaped-entities: 0 */
import Link from 'next/link';
import slugify from '@sindresorhus/slugify';
import { Heading, Text, Section } from '@xyflow/xy-ui';
import { BaseLayout, Hero } from 'xy-shared';
import { MapPinIcon } from '@heroicons/react/24/solid';

const openings: JobOpeningProps[] = [
  {
    location: 'Berlin (hybrid)',
    title: 'Fullstack Developer',
    description: [
      "Our libraries React Flow and Svelte Flow are at the core of what we do, \
       but it's not the only thing we work on. We also maintain a platform \
       for our Pro subscribers, regularly update our documentation with new \
       examples, and provide support to our users on GitHub, Discord, and by \
       email.",
      "We're looking for a full-stack developer to join our small team and get \
       stuck in to everything we do!",
    ],
    candidate: [
      "Experienced at full-stack or frontend JavaScript development. Bonus points \
       if you have worked with Next.js. Bonus-er points if you've worked with Nhost.",
      'Comfortable communicating in both written and spoken English.',
      'Able to take ownership and work independently on some projects.',
      'Passionate about independent open-source software.',
      'Interested in the different parts of our daily business: libraries, \
       pro-platform, docs, website, discord, support.',
      'Based in or around Berlin',
    ],
    tasks: [
      'Improve the checkout flow with Stripe on the Pro Platform.',
      'Work on improving the performance of Svelte Flow.',
      'Write a tutorial on how to build an AI chatbot with React Flow.',
      'Answer technical questions from our users over Discord or by email.',
      'Create a new example for our documentation.',
    ],
    benefits: [
      'Work on an interesting open source project used by thousands of developers',
      'Nice office in Berlin Kreuzberg',
      'Four day work-week (32 hours)',
      'Six weeks of vacation per year',
      'Salary range: 50k - 80k',
      'Monthly 1:1s, semi annual reviews',
      'Hybrid work model',
    ],
  },
];

export default function About() {
  return (
    <BaseLayout className="space-y-24">
      <Hero
        kicker="About Us"
        title="Careers at xyflow"
        subtitle="Learn about how we work and see our open positions"
        align="center"
      />

      <Section className="max-w-screen-md mx-auto lg:my-12 space-y-8">
        <Text size="lg" className="leading-8">
          Hi! We're xyflow and we build open source node-based UI libraries like{' '}
          <Link href="https://reactflow.dev" className="text-pink-500">
            React Flow
          </Link>{' '}
          and{' '}
          <Link href="https://svelteflow.dev" className="text-pink-500">
            Svelte Flow
          </Link>
          , which are used by thousands of developers. We are expanding our
          Berlin-based product development team and are looking for talented web
          developers to join us. Below is a list of our current job openings.
        </Text>
      </Section>

      {openings.map(JobOpening)}

      <Section className="max-w-screen-md mx-auto lg:my-12 space-y-6">
        <Heading size="md" className="mb-12">
          How we hire
        </Heading>

        <Text size="lg" className="leading-8">
          We consider applications on a rolling basis, and will add and remove
          job openings as the team grows. Here's how our hiring process works:
        </Text>

        <ol className="list-decimal ml-8 space-y-2">
          <li>
            <Text className="leading-8" size="lg">
              Our team goes through your application.
            </Text>
          </li>
          <li>
            <Text className="leading-8" size="lg">
              We invite you for a short 15 minute “vibe check” video call.
            </Text>
          </li>
          <li>
            <Text className="leading-8" size="lg">
              A small take-home assignment based on an old real-world support
              request that involves creating a small React Flow app.
            </Text>
          </li>
          <li>
            <Text className="leading-8" size="lg">
              We invite you for a one hour in person interview with one of the
              founders and some of the team.
            </Text>
          </li>
          <li>
            <Text className="leading-8" size="lg">
              We send you an offer.
            </Text>
          </li>
        </ol>
      </Section>

      <Section className="max-w-screen-md mx-auto lg:my-12 space-y-6">
        <Heading size="md" className="mb-12">
          How we work
        </Heading>

        <Text size="lg" className="leading-8">
          We are currently a team of five all working less than 40-hours per
          week. Four of us are in Berlin and regularly work in our office in
          Kreuzberg while one of us is in the UK. We all meet up in-person about
          twice a year. We communicate over Discord and have one weekly
          synchronous call. We also have a flexible schedule, which can work
          well with any responsibilities you may have during the week such as
          student obligations or family / medical needs.
        </Text>

        <Text size="lg" className="leading-8">
          We work in three-week cycles followed by one-week cooldown period.
          During the cooldown week we create “pitches” of new ideas, features,
          edits, or improvements. At the end of our cooldown week as a team we
          decide which ones we'll work on in the next cycle. We work on some
          pitches collaboratively, some alone. At the end of the cycle we talk
          about how the cycle was for us and show what we worked on.
        </Text>

        <Text size="lg" className="leading-8">
          We don't accept money from people like the military or agencies who
          conduct mass surveillance. Our libraries are MIT Licensed which
          translates to a core principle of transparency about our work. We do
          make money from our Pro subscriptions, but we are not seeking investor
          funding. We are anti-hustle culture.
        </Text>

        <Text size="lg" className="leading-8">
          Diversity and inclusion are a priority for us. We are open to
          discussions about how to make xyflow a more inclusive space and if we
          can make accomodations in our hiring process, please reach out to us.
        </Text>
      </Section>
    </BaseLayout>
  );
}

type JobOpeningProps = {
  location: string;
  title: string;
  description: string[];
  candidate: string[];
  tasks: string[];
  benefits: string[];
};

function JobOpening({
  title,
  description,
  candidate,
  tasks,
  benefits,
  location,
}: JobOpeningProps) {
  return (
    <Section
      id={slugify(title)}
      className="max-w-screen-lg bg-slate-50 rounded-xl p-4 md:p-8 lg:p-12 mx-auto space-y-6"
    >
      <div className="flex gap-2 items-center text-md">
        <MapPinIcon className="w-5 h-5" /> {location}
      </div>
      <Heading size="md" className="mb-12">
        {title}
      </Heading>

      {description.map((text, i) => (
        <Text key={i} size="lg" className="leading-8">
          {text}
        </Text>
      ))}

      <Heading size="sm">You are:</Heading>

      <ul className="list-disc ml-8 space-y-2">
        {candidate.map((text, i) => (
          <li key={i}>
            <Text className="leading-8" size="lg">
              {text}
            </Text>
          </li>
        ))}
      </ul>

      <Heading size="sm">Things you might do:</Heading>

      <ul className="list-disc ml-8 space-y-2">
        {tasks.map((text, i) => (
          <li key={i}>
            <Text className="leading-8" size="lg">
              {text}
            </Text>
          </li>
        ))}
      </ul>

      <Heading size="sm">What we can offer:</Heading>

      <ul className="list-disc ml-8 space-y-2">
        {benefits.map((text, i) => (
          <li key={i}>
            <Text className="leading-8" size="lg">
              {text}
            </Text>
          </li>
        ))}
      </ul>

      <Heading size="sm">How to apply:</Heading>

      <Text size="lg" className="leading-8">
        If you don't fit everything we wrote above or need some on-the-job
        skill-building, but you feel excited about the position, we would love
        to hear from you! To apply, send us an answer to the following questions
        with a paragraph or two of text (no more than 300 words) or a video /
        loom / audio clip (no more than 2 minutes):
      </Text>

      <ol className="list-decimal ml-8 space-y-2">
        <li>
          <Text className="leading-8" size="lg">
            What is most interesting to you about this job posting?
          </Text>
        </li>
        <li>
          <Text className="leading-8" size="lg">
            What past experience do you have that is relevant to this position?
          </Text>
        </li>
      </ol>

      <Text size="lg" className="leading-8">
        Send this along with your first name and preferred pronouns (if you'd
        like) and a document with your past working experience in any format you
        like over to <span className="font-bold">jobs@xyflow.com</span>. We aim
        to get back to applications within one week.
      </Text>
    </Section>
  );
}
