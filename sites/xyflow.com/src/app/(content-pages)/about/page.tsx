import { FC } from 'react';
import { Metadata } from 'next';
import { UserGroupIcon, GlobeEuropeAfricaIcon } from '@heroicons/react/24/outline';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import {
  ContentGrid,
  ContentGridItem,
  Heading,
  Text,
  Button,
  Section,
} from '@xyflow/xy-ui';
import { BaseLayout, Hero } from 'xy-shared';

import christopher from '../../../../public/img/christopher.jpg';
import moritz from '../../../../public/img/moritz.jpg';
import peter from '../../../../public/img/peter.jpg';
import burak from '../../../../public/img/burak.jpg';
import abbey from '../../../../public/img/abbey.jpg';
import dima from '../../../../public/img/dima.jpg';
import usman from '../../../../public/img/usman.jpg';

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
          description="Christopher is handling support, finances, and strategy. He keeps things organized and makes sure everything runs smoothly behind the scenes."
          links={[
            { linkName: 'Twitter', route: 'https://twitter.com/chrtze' },
            { linkName: 'Github', route: 'https://github.com/chrtze' },
          ]}
        />
        <TeamCard
          name="Moritz"
          role="Co-Founder"
          teamPic={moritz}
          description="Passionate about open-source development, Moritz is responsible for maintaining and improving all of xyflow's open-source projects. His technical expertise keeps the project moving forward."
          links={[
            { linkName: 'Twitter', route: 'https://twitter.com/moklick' },
            { linkName: 'Github', route: 'https://github.com/moklick' },
          ]}
        />
        <TeamCard
          name="Abbey"
          role="Software Engineer"
          teamPic={abbey}
          description="Since joining in 2024, Abbey has been focused on refining xyflow's documentation, building React Flow components and improving the overall experience of our websites. She is dedicated to making xyflow more accessible and user-friendly."
          links={[{ linkName: 'Github', route: 'https://github.com/printerscanner' }]}
        />
        <TeamCard
          name="Peter"
          role="Software Engineer"
          teamPic={peter}
          description="Peter joined xyflow in 2023, bringing his enthusiasm for Svelte and React development. He primarily works on Svelte Flow and his dedication ensures the project stays polished and responsive to user needs."
          links={[{ linkName: 'Github', route: 'https://github.com/peterkogo' }]}
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
          description="Burak is the maintainer of Vue Flow, bringing his expertise to xyflow’s ecosystem. He actively supports users on Discord and GitHub, helping developers troubleshoot issues and improve their workflow with Vue Flow."
          links={[
            { linkName: 'Github', route: 'https://github.com/bcakmakoglu' },
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
          links={[{ linkName: 'Github', route: 'https://github.com/usmanabdurrehman' }]}
        />
        <TeamCard
          name="Dima"
          role="Maintainer of Nextra"
          teamPic={dima}
          description="As the maintainer of Nextra, the framework powering xyflow’s documentation, Dima continuously enhances the platform. He works on adding new features to xyflow’s websites, ensuring a smooth and user-friendly experience."
          links={[
            { linkName: 'Github', route: 'https://github.com/dimaMachina' },
            {
              linkName: 'Website',
              route: 'https://dimamachina.com/',
            },
          ]}
        />
      </ContentGrid>

      <div className="flex justify-center mt-16 lg:mt-32">
        <div className="max-w-3xl w-full">
          <div className="flex justify-center items-center mb-2">
            <UserGroupIcon className="w-8 h-8" />
          </div>
          <Heading className="text-center">Work with us!</Heading>
          <Text size="lg" className="text-center text-light  mt-2">
            Besides our core team, we are working with these external contributors
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
