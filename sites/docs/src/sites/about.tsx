import { UserGroupIcon } from '@heroicons/react/24/outline';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

import { Heading, Text, Button } from 'xy-ui';
import BaseLayout from '@/layouts/base';
import Hero from '@/page-sections/hero';
import ContentGrid, { ContentGridItem } from '@/components/content-grid';

export default function About() {
  return (
    <BaseLayout>
      <Hero
        kicker="About Us"
        title="The story of xyflow"
        subtitle="todo title"
        align="center"
      />

      <div className="flex justify-center mt-16 lg:mt-20">
        <div className="max-w-3xl w-full">
          <div className="flex justify-center items-center mb-2">
            <UserGroupIcon className="w-8 h-8" />
          </div>
          <div className="text-center text-3xl font-bold">Meet the team</div>

          <div className="text-center text-light text-lg mt-2">
            Christopher, Hayleigh, John, and Moritz
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
          description="John works on all things un-code at xyFlow, which is a lot of writing and talking about where xyFlow is headed, how we get there, and open source in general. Before jumping into the world of open source, UX design and research were his bread and butter. Besides that, he likes looking at birds, playing music, and designing puzzles."
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
