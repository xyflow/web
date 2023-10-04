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

import { Heading, ListWrapper, Text, Button, type HeroIcon } from 'xy-ui';
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
        subtitle="Thanks for supporting Svelte Flow, there are lots of ways you can help the library, ecosystem, and community."
        kicker={<Kicker />}
        align="center"
      />
      <ContentGrid className="mt-20">
        <GridItem
          icon={CommandLineIcon}
          title="Show us what you made"
          links={[
            { linkName: 'Discord', route: '/' },
            { linkName: 'Email us', route: '/' },
          ]}
          text={
            <>
              We love works in progress and screenshots. Drop it in into our
              Discord Server, tweet at us, drop us an email
            </>
          }
        />
        <GridItem
          icon={UserGroupIcon}
          title="Join the Community"
          links={[
            { linkName: 'Github Discussions', route: '/' },
            { linkName: 'Discord', route: '/' },
          ]}
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
          links={[{ linkName: 'Github Issues', route: '/' }]}
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
          links={[
            { linkName: 'Github Sponsors', route: '/' },
            { linkName: 'Open Collective', route: '/' },
          ]}
          text={
            <>
              If you are an organization who wants to make sure Svelte Flow
              continues to be maintained, you can sponsor us on Github or
              OpenCollective, or reach out to us at info@xyflow.com
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
  route,
  linkName,
  links,
}: {
  title: ReactNode;
  text: ReactNode;
  icon: HeroIcon;
  route?: string;
  linkName?: string;
  links?: Array<{ route: string; linkName: string }>;
}) {
  return (
    <ContentGridItem>
      <Icon className="text-svelte w-8 h-8" />
      <Heading size="sm" className="mt-2 mb-4" as="p">
        {title}
      </Heading>
      <Text variant="light" className="text-md">
        {text}
      </Text>
      <div className="flex items-center space-x-4 mt-8">
        {links &&
          links.map((link) => {
            return (
              <Button asChild variant="link" className="text-svelte text-md">
                <Link href={link.route}>
                  {link.linkName}{' '}
                  <ArrowRightCircleIcon className="ml-1 w-4 h-4" />
                </Link>
              </Button>
            );
          })}
      </div>
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
