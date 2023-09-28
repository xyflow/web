import { type ReactNode } from 'react';
import {
  HeartIcon,
  CommandLineIcon,
  UserGroupIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  DocumentDuplicateIcon,
  SparklesIcon,
  StarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

import { Heading, ListWrapper, Text, type HeroIcon } from 'xy-ui';
import BaseLayout from '@/layouts/base';
import Hero from '@/page-sections/hero';
import ContentGrid, { ContentGridItem } from '@/components/content-grid';

function Kicker() {
  return (
    <>
      <HeartIcon className="inline-block w-6 h-6 mr-1" />
      Support
    </>
  );
}

export default function CaseStudies() {
  return (
    <BaseLayout>
      <Hero
        title="Support Svelte Flow"
        subtitle="Thanks for supporting Svelte Flow, there are lots of ways you can support the library, ecosystem, and community."
        kicker={<Kicker />}
        align="center"
      />
      <ContentGrid className="mt-20">
        <GridItem
          icon={CommandLineIcon}
          title="Show us what you make"
          text={
            <>
              Drop it in into our Discord Server, tweet at us, or email us at
              info@xyflow.com
            </>
          }
        />
        <GridItem
          icon={UserGroupIcon}
          title="Join the Community"
          text={
            <>
              Ask and answer questions in our Discord Server or jump in on
              Github discussions.
            </>
          }
        />
        <GridItem
          icon={CheckCircleIcon}
          title="Squash Bugs"
          text={
            <>
              We can’t catch them all. Check existing issues and discussions
              first, then create a new issue to tell us what’s up.
            </>
          }
        />
        <GridItem
          icon={CurrencyDollarIcon}
          title="Financial Support"
          text={
            <>
              If you are an organization who wants to make sure Svelte Flow
              continues to be maintained, reach out to us at info@xyflow.com
            </>
          }
        />
      </ContentGrid>

      <ListWrapper
        className="mt-16 lg:mt-24"
        icon={SparklesIcon}
        iconClassName="text-svelte"
        title="Other ways to support us"
        subtitle="You or your organization can also..."
      >
        <ListItem
          icon={DocumentDuplicateIcon}
          label="Improve and edit our docs"
          link="/svelte-flow"
        />
        <ListItem
          icon={StarIcon}
          label="Star us on Github"
          link="/svelte-flow"
        />
        <ListItem
          icon={ChatBubbleOvalLeftEllipsisIcon}
          label="Tweet/toot about us"
          link="/svelte-flow"
        />
        <ListItem
          icon={ChatBubbleOvalLeftEllipsisIcon}
          label="Sponsor us on Open Collective"
          link="/svelte-flow"
        />
        <ListItem
          icon={ChatBubbleOvalLeftEllipsisIcon}
          label="Sponsor us on Github"
          link="/svelte-flow"
        />
        <ListItem
          icon={ChatBubbleOvalLeftEllipsisIcon}
          label="Create Tutorials for Svelte Flow"
        />
      </ListWrapper>
    </BaseLayout>
  );
}

function GridItem({
  title,
  text,
  icon: Icon,
}: {
  title: ReactNode;
  text: ReactNode;
  icon: HeroIcon;
}) {
  return (
    <ContentGridItem>
      <Icon className="text-svelte w-8 h-8" />
      <Heading size="sm" className="mt-2 mb-4" as="p">
        {title}
      </Heading>
      <Text variant="light">{text}</Text>
    </ContentGridItem>
  );
}

function ListItem({
  label,
  icon: Icon,
  link,
}: {
  label: ReactNode;
  icon: HeroIcon;
  link?: string;
}) {
  const WrapperComponent = link ? Link : 'div';

  return (
    <WrapperComponent
      href={link}
      className="flex py-6 border-b border-solid border-gray-100"
    >
      <Icon className="w-6 h-6 mr-2" />
      <Text className="font-bold">{label}</Text>
      {link && <ArrowRightCircleIcon className="text-svelte w-6 h-6 ml-auto" />}
    </WrapperComponent>
  );
}
