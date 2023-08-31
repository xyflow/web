import { UserGroupIcon } from '@heroicons/react/24/outline';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

import { Heading, Text, Button } from 'xy-ui';
import Image from 'next/image';

import BaseLayout from '@/layouts/base';
import Hero from '@/page-sections/hero';
import Section from '@/page-sections/section';
import aboutUsImage from '@/../public/img/aboutus-team.png';

import ContentGrid, { ContentGridItem } from '@/components/content-grid';

export default function About() {
  return (
    <BaseLayout>
      <Hero
        kicker="About Us"
        title="The story of xyflow"
        subtitle="How we got here"
        align="center"
      />

      <Section className="max-w-screen-md mx-auto mt-12 lg:my-12">
        <Image
          src={aboutUsImage}
          alt="A picture of Christopher, Hayleigh, John, and Moritz"
          placeholder="blur"
          className="mx-auto lg:max-w-[544px] mt-2"
        ></Image>
        <Text className="text-lg leading-8 mb-8">
          Since 2014, Moritz and Christopher have been creating infographics,
          tools, and projects together through their interactive news agency, 
          <Link href="https://webkid.io/" className="text-pink-500">
            webkid
          </Link>
          . Along the way to creating 
          <Link href="https://datablocks.pro/" className="text-pink-500">
            Datablocks
          </Link>{' '}
          in 2019, they developed React Flow and decided to open-source it. More
          and more people started using it, to the point they decided to work on
          it full-time in 2021 to create a sustainable open-source project like
          the many they had used.
        </Text>
        <Text className="text-lg leading-8 mb-8">
          John and Hayleigh joined the team in 2022 and 2023 respectively to
          help out with the many things that revolve around an open source
          library. In 2023, we generalized the core of React Flow by porting the
          library to Svelte. In order to keep all of our ducks in a row, we
          created xyFlow to be the house where all of our project could live.
          Now, here we are- happy maintainers of a couple of libraries
          we&apos;re proud of with wonderful communities behind them :)
        </Text>
        <Text className="text-lg leading-8 mb-8">
          If you need anything, have an idea, or just want to say hi, we&apos;re
          an email away at info@xyflow.com.
        </Text>
        <Text className="text-lg leading-8">
          ✌🏻 Christopher, Hayleigh, John, and Moritz
        </Text>
      </Section>

      <div className="flex justify-center mt-16 lg:mt-32">
        <div className="max-w-3xl w-full">
          <div className="flex justify-center items-center mb-2">
            <UserGroupIcon className="w-8 h-8" />
          </div>
          <Heading className="text-center">Meet the team</Heading>
          <div className="text-center text-light text-lg mt-2">
            Who&apos;s driving this thing?
          </div>
        </div>
      </div>

      <ContentGrid className="mt-16 lg:mt-20">
        <TeamCard
          name="Christopher"
          description="Christopher doesn’t remember anything before 2015. He woke up on the shores of the Spree, where he wandered into the offices of the newspaper Zeit and they gave him a job as a front-end developer, mistaking him for the potential new hire. He quickly rose through the ranks there. Now he codes at xyFlow, hoping one day he will remember how he got here, and what the meaning of all this is anyway."
          twitter="chrtze"
          github="chrtze"
        />
        <TeamCard
          name="Hayleigh"
          description="Hayleigh is a time traveller who arrived in the year 2023 on accident trying to get to the year 2032 (her home-year). While she and her 2 cats wait another 7 years until the time machine is re-invented, she decided to take to coding in languages (archaic to her) such as React, Javascript, and Elm. "
          twitter="hayleighdotdev"
          github="hayleigh-dot-dev"
        />
        <TeamCard
          name="John"
          description="John works on all things un-code at xyflow, which is a lot of writing and talking about where xyflow is headed, how we get there, and open source in general. Before jumping into the world of open source, UX design and research were his bread and butter. Besides that, he likes looking at birds, playing music, and designing puzzles."
          twitter="johnrobbjr"
          github="johnrobbjr"
        />
        <TeamCard
          name="Moritz"
          description="Moritz was raised in the depths of Tolteburger Wald by a pack of wolves, learning how to hunt, survive, and develop front-end applications. He abandoned his pack after a disagreement in 2019, where he fled to the streets of Berlin. He now maintains React Flow, and dreams of one day rejoining his pack."
          twitter="moklick"
          github="moklick"
        />
      </ContentGrid>
    </BaseLayout>
  );
}

function TeamCard({
  name,
  description,
  twitter,
  github,
}: {
  name: string;
  description: string;
  twitter: string;
  github: string;
}) {
  return (
    <ContentGridItem>
      <Heading as="p" size="sm" className="mb-4">
        {name}
      </Heading>
      <Text className="mb-4">{description}</Text>

      <div className="flex items-center space-x-4">
        <Button asChild variant="link">
          <Link href={`https://twitter.com/${twitter}`}>
            Twitter <ArrowRightCircleIcon className="ml-1 w-4 h-4" />
          </Link>
        </Button>
        <Button asChild variant="link">
          <Link href={`https://github.com/${github}`}>
            Github <ArrowRightCircleIcon className="ml-1 w-4 h-4" />
          </Link>
        </Button>
      </div>
    </ContentGridItem>
  );
}
