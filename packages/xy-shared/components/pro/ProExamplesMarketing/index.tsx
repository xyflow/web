import { FC, type ReactNode } from 'react';
import Image from 'next/image';
import { ContentGrid, ContentGridItem } from '../../ui/content-grid';
import { Button } from '../../ui/button';
import { Heading } from '../../ui/heading';
import { Text } from '../../ui/text';
import { Logo } from '../../ui/logo';
import { Container } from '../../ui/container';
import { Section } from '../../ui/section';
import { ListWrapper } from '../../ui/list-wrapper';
import { Link } from '../../ui/link';
import type { HeroIcon } from '../../../types';

import { BaseLayout } from '../../../layouts/base';
import { Hero } from '../../hero';
import { ProjectPreview } from '../../project-preview';
import { LayoutBreakout } from '../../../layouts/breakout';
import { fetchJSON } from '../../../lib/fetch-json';
import { SignUpButton } from '../SignUpButton';
import {
  ArrowDownCircleIcon,
  ArrowRightCircleIcon,
  PlusCircleIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import type { MdxFile } from 'nextra';
import { getExamplesPageMap } from '../../../server/example-utils';
import { getFramework } from '../../../lib/get-framework';

/** Served from each site's public folder at /img/pro/... */
const IMG = {
  star: '/img/pro/star.svg',
  hero: '/img/pro/pro-examples.png',
  helperLines: '/img/pro/helper-lines-pro-example.jpg',
} as const;

export type FreeTrialSection = {
  route: string;
  title: string;
  description: string;
  demoLabel: string;
  signUpDescription: string;
};

const { framework, library } = getFramework();

export type ProExamplesMarketingProps = {
  freeTrialSection?: FreeTrialSection;
};

export const ProExamplesMarketing: FC<ProExamplesMarketingProps> = async ({
  freeTrialSection,
}) => {
  const remoteProExamplesResponse = await fetchJSON(
    `${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/${framework}/apps.json?t=1`,
  );
  const remoteProExamples = Array.isArray(remoteProExamplesResponse)
    ? remoteProExamplesResponse
    : [];
  const pageMap = await getExamplesPageMap();
  const proExamples = pageMap.children
    .flatMap((item) =>
      'children' in item
        ? item.children.filter((child): child is MdxFile => 'frontMatter' in child)
        : [],
    )
    .filter((item) => item.frontMatter!.is_pro_example)
    .sort((a, b) => a.frontMatter!.title.localeCompare(b.frontMatter!.title));

  const examples = proExamples.reduce<
    {
      route: string;
      image: string;
      imageDark: string;
      id: string;
      name: string;
      description: string;
      detailedDescription: string;
    }[]
  >((result, curr) => {
    const remote = remoteProExamples.find(
      (remote: { id: string }) => remote.id === curr.name,
    );

    if (remote) {
      result.push({
        ...remote,
        route: curr.route,
        image: `${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/${framework}/${remote.id}/thumbnail.jpg?v=13`,
        imageDark: `${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/${framework}/${remote.id}/thumbnail-dark.jpg?v=13`,
      });
    }

    return result;
  }, []);

  return (
    <BaseLayout>
      <Hero
        className="lg:gap-20"
        title={
          <div className="mt-6">
            Upgrade your apps with {library} <StarText /> Examples
          </div>
        }
        subtitle={`Get advanced ${library} code examples to use in your node-based UIs, crafted by the ${library} core team.`}
        action={
          <div className="flex flex-wrap gap-2 items-center">
            <Button
              variant="secondary"
              className="text-foreground w-full md:w-auto"
              asChild
              size="lg"
            >
              <Link href="/pro">See Plans</Link>
            </Button>
            <SignUpButton showIcon />
          </div>
        }
        backgroundVariant="image"
      >
        <Image
          src={IMG.hero}
          alt="Overview of the pro example apps"
          width={640}
          height={460}
          className="hidden lg:block"
          priority
          style={{ objectFit: 'contain' }}
        />
      </Hero>
      <Section className="z-1 relative">
        <ContentGrid className="lg:grid-cols-4 border-t-0 gap-12">
          <GridItem
            title={`By the creators of ${library}`}
            text="Feature-complete and crafted by the core team"
            // @ts-expect-error Logo component matches usage
            icon={() => <Logo className={'h-8 w-8'} />}
          />
          <GridItem
            title="Downloadable Vite apps and guides"
            text="Step-by-step instructions on how each example works"
            icon={ArrowDownCircleIcon}
          />
          <GridItem
            title="Regularly Added and Updated"
            text="Subscribers are the first to get new pro examples and refactors"
            icon={PlusCircleIcon}
          />
          <GridItem
            title="Subscribe for one, use them forever"
            text="Download the pro examples and use them anywhere, anytime"
            icon={StarIcon}
          />
        </ContentGrid>
      </Section>

      {freeTrialSection ? (
        <>
          <hr className="border-gray-100" />
          <Section>
            <Container>
              <Image
                src={IMG.helperLines}
                width={1168}
                height={474}
                alt="Shapes Example Preview"
                priority
                style={{ objectFit: 'contain', display: 'block', width: '100%' }}
              />
            </Container>
            <div className="flex flex-wrap mt-10 gap-2">
              <Heading
                className="w-full md:w-auto mb-auto flex gap-3 items-center"
                size="md"
              >
                {freeTrialSection.title}{' '}
                <span className="text-sm text-primary bg-gray-100 px-3 py-1 rounded-full">
                  Free Trial
                </span>
              </Heading>
              <div className="md:max-w-lg ml-auto">
                <Text>{freeTrialSection.description}</Text>
                <div className="mt-6 flex flex-wrap gap-2 items-center">
                  <Button asChild size="lg" variant="black" className="w-full md:w-auto">
                    <Link href={freeTrialSection.route}>
                      {freeTrialSection.demoLabel}
                    </Link>
                  </Button>
                  <SignUpButton description={freeTrialSection.signUpDescription} />
                </div>
              </div>
            </div>
          </Section>
        </>
      ) : null}

      <ContentGrid className="mt-20">
        {examples.map((example) => (
          <ContentGridItem key={example.id} route={example.route}>
            <ProjectPreview
              image={example.image}
              imageDark={example.imageDark}
              title={example.name}
              description={example.detailedDescription}
              linkLabel="Demo"
            />
          </ContentGridItem>
        ))}
      </ContentGrid>

      <Section className="lg:px-0">
        <LayoutBreakout className="x:max-w-(--nextra-content-width) lg:ml-0 lg:mr-0 lg:right-0 lg:left-0 lg:w-full lg:px-0 !mt-0">
          <Container
            variant="dark"
            className="max-lg:rounded-none"
            innerClassName="px-4 py-8 flex flex-wrap gap-4 relative w-full items-center shadow-none bg-none bg-gray-100/10 lg:px-20 lg:py-20"
          >
            <div className="max-md:w-full md:flex-1">
              <Text className="text-gray-400 mb-4">Get Started</Text>
              <Heading size="md">Boost your apps with {library} Pro</Heading>
            </div>
            <div className="max-md:w-full md:flex-1">
              <Text className="mb-8 text-gray-300">
                Get full access to all pro examples with just one month with a Pro
                subscription — from €129.
              </Text>
              <div className="flex flex-wrap gap-2 mt-4">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="text-foreground hover:bg-gray-100 w-full md:w-auto"
                >
                  <Link href="/pro/sign-up">Try it out</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="black"
                  className="bg-white/10 hover:bg-white/20 w-full md:w-auto"
                >
                  <Link href="/pro/subscribe">See subscription plans</Link>
                </Button>
              </div>
            </div>
          </Container>
        </LayoutBreakout>
      </Section>

      <Section>
        <ListWrapper
          className="max-w-lg mx-auto"
          title="Are you a student, educator, or open source developer?"
          subtitle="Get all of these Pro examples for free"
        >
          <ListItem
            title="For education purposes"
            text={
              <>
                Email us at{' '}
                <Link className="font-bold hover:underline" href="mailto:info@xyflow.com">
                  info@xyflow.com
                </Link>{' '}
                using your university email address
              </>
            }
          />
          <hr className="my-5" />
          <ListItem
            title="For non-commercial open source projects"
            text={
              <>
                <Link
                  className="font-bold hover:underline"
                  target="_blank"
                  rel="noreferrer"
                  href="https://xyflow.com/contact"
                >
                  Contact us
                </Link>{' '}
                with the link to the GitHub or GitLab repository
              </>
            }
          />
        </ListWrapper>
      </Section>
    </BaseLayout>
  );
};

function ListItem({ title, text }: { title: ReactNode; text: ReactNode }) {
  return (
    <div className="mb-4">
      <Text className="font-bold mt-2">{title}</Text>
      <Text variant="light">{text}</Text>
    </div>
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
    <div>
      <Icon className="text-foreground w-8 h-8" />
      <div className="text-3xl font-bold mt-2 mb-4">{title}</div>
      <Text variant="light" className="text-md">
        {text}
      </Text>

      <div className="flex items-center space-x-4 mt-8">
        {links?.map((link) => (
          <Button
            key={link.route}
            asChild
            variant="link"
            className="text-primary text-md"
          >
            <Link href={link.route} target={link.target}>
              {link.linkName} <ArrowRightCircleIcon className="ml-1 w-4 h-4" />
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}

function StarText() {
  return (
    <span className="inline-flex relative text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#FF99C7]">
      <span>Pro</span>
      <Image
        src={IMG.star}
        alt="star"
        width={20}
        height={20}
        className="absolute h-5 w-5 left-[40%] opacity-50"
      />
      <Image
        src={IMG.star}
        alt="star"
        width={16}
        height={16}
        className="absolute h-4 w-4 -right-[10px] top-1/2 opacity-20"
      />
      <Image
        src={IMG.star}
        alt="star"
        width={12}
        height={12}
        className="absolute h-3 w-3 left-[16px] bottom-[6px] opacity-70"
      />
    </span>
  );
}
