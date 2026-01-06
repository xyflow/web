import { FC } from 'react';
import { Metadata } from 'next';
import { UserGroupIcon, GlobeEuropeAfricaIcon } from '@heroicons/react/24/outline';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { ContentGrid, ContentGridItem, Heading, Text, Button, Section } from 'xy-shared';
import { BaseLayout, Hero } from 'xy-shared';

import christopher from '../../../../public/img/christopher.jpg';
import moritz from '../../../../public/img/moritz.jpg';
import peter from '../../../../public/img/peter.jpg';
import burak from '../../../../public/img/burak.jpg';
import abbey from '../../../../public/img/abbey.jpg';
import alessandro from '../../../../public/img/alessandro.jpg';
import dima from '../../../../public/img/dima.jpg';
import usman from '../../../../public/img/usman.jpg';
import facu from '../../../../public/img/facu.jpg';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Get to know the team behind xyflow, React Flow, and Svelte Flow.',
};

const Page: FC = () => {
  return (
    <BaseLayout>
      <Hero kicker="About Us" title="The story of xyflow" align="center" />

      <Section className="max-w-screen-md mx-auto mt-12 lg:my-12">
        <Text size="lg" className="leading-8 mb-8">
          Since 2014, Moritz and Christopher have been creating infographics, tools, and
          interactive projects through their agency,{' '}
          <Link href="https://webkid.io/" className="text-pink-500">
            webkid
          </Link>
          . While developing{' '}
          <Link href="https://datablocks.pro/" className="text-pink-500">
            Datablocks
          </Link>{' '}
          in 2019, they created React Flow and decided to open-source it. As adoption
          grew, they began working on it full-time in 2021 to develop it into a
          sustainable open-source project, just like the ones they loved using.
        </Text>
        <Text size="lg" className="leading-8 mb-8">
          Today, we&apos;ve expanded the team and generalized the core of React Flow to
          support frameworks beyond React. To keep everything organized, we launched
          xyflow—a home for all our projects. Now, here we are–happy maintainers of a
          couple of libraries we&apos;re proud of with wonderful communities behind them
          :)
        </Text>
        <Text size="lg" className="leading-8 mb-8">
          If you need anything, have an idea, or just want to say hi, we&apos;re an email
          away at info@xyflow.com.
        </Text>
        <Text size="lg" className="leading-8">
          ✌🏻 the xyflow team
        </Text>
      </Section>

      <div className="flex justify-center mt-16 lg:mt-32">
        <div className="max-w-3xl w-full">
          <div className="flex justify-center items-center mb-2">
            <UserGroupIcon className="w-8 h-8" />
          </div>
          <Heading className="text-center">Core Team</Heading>
          <Text size="lg" className="text-center text-light  mt-2">
            Our product development team is based in Berlin and works full-time on xyflow
          </Text>
        </div>
      </div>

      <ContentGrid className="mt-16 lg:mt-20 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        <TeamCard
          name="Christopher"
          teamPic={christopher}
          role="Co-Founder"
          description="Christopher doesn't remember anything before 2015. He woke up on the shores of the Spree, where he wandered into the offices of the newspaper Zeit and they gave him a job as a front-end developer, mistaking him for the potential new hire. He quickly rose through the ranks there. Now he codes at xyflow, hoping one day he will remember how he got here, and what the meaning of all this is anyway."
          links={[
            { linkName: 'Twitter', route: 'https://twitter.com/chrtze' },
            { linkName: 'GitHub', route: 'https://github.com/chrtze' },
          ]}
        />
        <TeamCard
          name="Moritz"
          role="Co-Founder"
          teamPic={moritz}
          description="Moritz was raised in the depths of Teutoburger Wald by a pack of wolves, learning how to hunt, survive, and develop front-end applications. He abandoned his pack after a disagreement in 2019, where he fled to the streets of Berlin. He now maintains React Flow, and dreams of one day rejoining his pack."
          links={[
            { linkName: 'Twitter', route: 'https://twitter.com/moklick' },
            { linkName: 'GitHub', route: 'https://github.com/moklick' },
          ]}
        />
        <TeamCard
          name="Abbey"
          role="Software Engineer"
          teamPic={abbey}
          description="Abbey spent the first twenty years of her career finely crafting an innovative sea bass fishing technique. The world of sea bass became all too political for her, but luckily she found xyflow, which she wrongly assumed was another commercial fishing company. She is still figuring out how to turn on a computer, but once she does, she is excited to start contributing to the team."
          links={[{ linkName: 'GitHub', route: 'https://github.com/printerscanner' }]}
        />
        <TeamCard
          name="Peter"
          role="Software Engineer"
          teamPic={peter}
          description="Peter has been directing a mockumentary of the xyflow team a la The Office since he broke into our building during the summer of 2023. Luckily for our team, the footage will never be released since he never asked us to sign a talent waiver, and none of us have the heart to tell him. Once he's done editing the footage (he keeps saying 'one more week'), we're hoping he'll make some contributions to the Svelte Flow library and docs."
          links={[{ linkName: 'GitHub', route: 'https://github.com/peterkogo' }]}
        />
        <TeamCard
          name="Alessandro"
          role="Software Engineer"
          teamPic={alessandro}
          description="Alessandro likes to hack programming languages, compilers, synthesizers, sound systems and more."
          links={[
            { linkName: 'Website', route: 'https://cheli.dev' },
            { linkName: 'GitHub', route: 'https://github.com/0x0f0f0f' },
          ]}
        />
      </ContentGrid>

      <div className="flex justify-center mt-16 lg:mt-32">
        <div className="max-w-3xl w-full">
          <div className="flex justify-center items-center mb-2">
            <GlobeEuropeAfricaIcon className="w-8 h-8" />
          </div>
          <Heading className="text-center">Collaborators</Heading>
          <Text size="lg" className="text-center text-light  mt-2">
            Besides our core team, we are working with these external contributors
          </Text>
        </div>
      </div>

      <ContentGrid className="mt-16 lg:mt-20 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        <TeamCard
          name="Burak"
          role="Maintainer of Vue Flow"
          teamPic={burak}
          description="Burak is the maintainer of Vue Flow, bringing his expertise to xyflow's ecosystem. He actively supports users on Discord and GitHub, helping developers troubleshoot issues and improve their workflow with Vue Flow."
          links={[
            { linkName: 'GitHub', route: 'https://github.com/bcakmakoglu' },
            {
              linkName: 'Website',
              route: 'https://www.scheissaufdeinmarketingdusalamiwurst.de/',
            },
          ]}
        />
        <TeamCard
          name="Usman"
          role="Discord Moderator"
          teamPic={usman}
          description="Working with xyflow since 2025, Usman plays a key role in community support. He provides assistance on Discord and creates video content that helps users understand and make the most of React Flow."
          links={[{ linkName: 'GitHub', route: 'https://github.com/usmanabdurrehman' }]}
        />
        <TeamCard
          name="Dima"
          role="Maintainer of Nextra"
          teamPic={dima}
          description="As the maintainer of Nextra, the framework powering xyflow's documentation, Dima continuously enhances the platform. He works on adding new features to xyflow's websites, ensuring a smooth and user-friendly experience."
          links={[
            { linkName: 'GitHub', route: 'https://github.com/dimaMachina' },
            {
              linkName: 'Website',
              route: 'https://dimamachina.com/',
            },
          ]}
        />
        <TeamCard
          name="Facu"
          role="Designer"
          teamPic={facu}
          description="Since redesigning the xyflow websites in 2023, Facu has been collaborating with the team on all design-related tasks. He currently works for Clerk and has his own studio called Kundo."
          links={[
            {
              linkName: 'Website',
              route: 'https://www.facumontanaro.com/',
            },
          ]}
        />
      </ContentGrid>

      <div className="flex justify-center mt-16 lg:mt-32">
        <div className="max-w-3xl w-full">
          <div className="flex justify-center items-center mb-2">
            <UserGroupIcon className="w-8 h-8" />
          </div>
          <Heading className="text-center">Join our team</Heading>
          <Text size="lg" className="text-center text-light  mt-2">
            We are expanding our Berlin-based product development team and are looking for
            talented web developers to join us. To see our open positions, check out our{' '}
            <Link className="text-pink-500" href="/careers">
              careers page
            </Link>
            .
          </Text>
        </div>
      </div>
    </BaseLayout>
  );
};

function TeamCard({
  name,
  description,
  role,
  links,
  teamPic,
}: {
  name: string;
  role: string;
  description: string;
  teamPic?: StaticImageData;
  links?: Array<{ route: string; linkName: string }>;
}) {
  return (
    <ContentGridItem className="flex flex-col px-8 py-10 lg:py-16">
      {teamPic && (
        <div className="mb-8 lg:-mt-8 w-full aspect-[3.5/4] max-w-[320px] relative">
          <Image
            objectFit="cover"
            src={teamPic}
            alt={name}
            className="mb-8 lg:-mt-8"
            fill
          />
        </div>
      )}
      <Heading as="p" size="sm" className="mb-4">
        {name}
      </Heading>
      <Text className="mb-4">{role}</Text>
      <Text className="mb-8">{description}</Text>

      <div className="flex items-center space-x-4 mt-auto">
        {links &&
          links.map((link) => {
            return (
              <Button key={link.route} asChild variant="link" className=" text-md">
                <Link href={link.route}>
                  {link.linkName} <ArrowRightCircleIcon className="ml-1 w-4 h-4" />
                </Link>
              </Button>
            );
          })}
      </div>
    </ContentGridItem>
  );
}

export default Page;
