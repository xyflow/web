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

import {
  BaseLayout,
  ContentGrid,
  ContentGridItem,
  Heading,
  ListWrapper,
  Text,
  Hero,
  Button,
  type HeroIcon,
} from 'xy-ui';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

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
        subtitle="Thanks for your interest in Svelte Flow! There are lots of ways you can help the library, ecosystem, and community grow."
        kicker={<Kicker />}
        align="center"
      />
      <ContentGrid className="mt-20">
        <GridItem
          icon={CommandLineIcon}
          title="Show us what you've made"
          links={[
            {
              linkName: 'Discord',
              target: '_blank',
              route: 'https://discord.gg/RVmnytFmGW',
            },
            { linkName: 'Contact us', route: 'https://xyflow.com/contact' },
          ]}
          text={
            <>
              We love to see works in progress and screenshots. Drop it in into
              our Discord Server, tweet at us, or drop us an email
            </>
          }
        />
        <GridItem
          icon={UserGroupIcon}
          title="Join the Community"
          links={[
            {
              linkName: 'Github Discussions',
              route: 'https://github.com/xyflow/xyflow/discussions',
            },
            { linkName: 'Discord', route: 'https://discord.gg/RVmnytFmGW' },
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
          links={[
            {
              linkName: 'Github Issues',
              route: 'https://github.com/xyflow/xyflow/issues',
            },
          ]}
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
            {
              linkName: 'Github Sponsors',
              route: 'https://github.com/sponsors/xyflow',
            },
            {
              linkName: 'Open Collective',
              route: 'https://opencollective.com/reactflow',
            },
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
        iconClassName="text-primary"
        title="Other ways to support us"
        subtitle="You or your organization can also..."
      >
        <ListItem
          icon={DocumentDuplicateIcon}
          label="Improve and edit our docs"
          link="https://github.com/xyflow/web"
        />
        <ListItem
          icon={StarIcon}
          label="Star us on Github"
          link="https://github.com/xyflow/xyflow"
        />
        <ListItem
          icon={ChatBubbleOvalLeftEllipsisIcon}
          label="Toot about us"
          link="https://fosstodon.org/@reactflowdev"
        />
      </ListWrapper>
    </BaseLayout>
  );
}

function GridItem({
  title,
  text,
  icon: Icon,
  links,
}: {
  title: ReactNode;
  text: ReactNode;
  icon: HeroIcon;
  links?: Array<{ route: string; linkName: string; target?: string }>;
}) {
  return (
    <ContentGridItem>
      <Icon className="text-primary w-8 h-8" />
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
              <Button
                key={link.route}
                asChild
                variant="link"
                className="text-primary text-md"
              >
                <Link href={link.route} target={link.target}>
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
      className="flex py-6 px-4 border-b border-solid border-gray-100 hover:bg-gray-50"
    >
      <Icon className="w-6 h-6 mr-2" />
      <Text className="font-bold">{label}</Text>
      {link && (
        <ArrowRightCircleIcon className="text-primary w-6 h-6 ml-auto" />
      )}
    </WrapperComponent>
  );
}
