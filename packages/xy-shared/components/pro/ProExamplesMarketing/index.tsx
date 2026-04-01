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
import { withProExamplesImageVersion } from '../../../lib/cached-image-version';
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
        image: withProExamplesImageVersion(
          `${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/${framework}/${remote.id}/thumbnail.jpg`,
        ),
        imageDark: withProExamplesImageVersion(
          `${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/${framework}/${remote.id}/thumbnail-dark.jpg`,
        ),
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
            Upgrade your apps with {library} <StarText /> Content
          </div>
        }
        subtitle={`Get advanced ${library} examples and templates to use in your node-based UIs, crafted by the ${library} core team.`}
        action={
          <div className="flex flex-wrap items-center gap-2">
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
        <ContentGrid className="gap-12 border-t-0 lg:grid-cols-4">
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
            text="Subscribers are the first to get new pro content and refactors"
            icon={PlusCircleIcon}
          />
          <GridItem
            title="Subscribe for one, use them forever"
            text="Download the pro examples and templates and use them anywhere"
            icon={StarIcon}
          />
        </ContentGrid>
      </Section>

      <Heading size="lg" className="text-center">
        {library} <StarText /> Examples
      </Heading>
      <Text size="lg" className="mx-auto mt-4 max-w-2xl text-center">
        These are our pro examples that you can use in your projects.
      </Text>

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
            <div className="mt-10 flex flex-wrap gap-2">
              <Heading
                className="mb-auto flex w-full items-center gap-3 md:w-auto"
                size="md"
              >
                {freeTrialSection.title}{' '}
                <span className="text-primary rounded-full bg-gray-100 px-3 py-1 text-sm">
                  Free Trial
                </span>
              </Heading>
              <div className="ml-auto md:max-w-lg">
                <Text>{freeTrialSection.description}</Text>
                <div className="mt-6 flex flex-wrap items-center gap-2">
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

      <ContentGrid className="mt-10 grid-cols-1 lg:grid-cols-3">
        {examples.map((example) => (
          <ContentGridItem key={example.id} route={example.route}>
            <ProjectPreview
              image={example.image}
              imageDark={example.imageDark}
              title={example.name}
              description={example.detailedDescription}
              linkLabel="Demo"
              imageWrapperClassName="shadow-md bg-transparent border-none p-px rounded-xl pro-example-preview-thumb"
            />
          </ContentGridItem>
        ))}
      </ContentGrid>

      <Heading size="lg" className="text-center">
        {library} <StarText /> Templates
      </Heading>
      <Text size="lg" className="mx-auto mt-4 max-w-2xl text-center">
        Pro templates that you can use in your projects.
      </Text>

      <Section className="lg:px-0">
        <LayoutBreakout className="x:max-w-(--nextra-content-width) !mt-0 lg:left-0 lg:right-0 lg:ml-0 lg:mr-0 lg:w-full lg:px-0">
          <Container
            variant="dark"
            className="max-lg:rounded-none"
            innerClassName="px-4 py-8 flex flex-wrap gap-4 relative w-full items-center shadow-none bg-none bg-gray-100/10 lg:px-20 lg:py-20"
          >
            <div className="max-md:w-full md:flex-1">
              <Text className="mb-4 text-gray-400">Get Started</Text>
              <Heading size="md">Boost your apps with {library} Pro</Heading>
            </div>
            <div className="max-md:w-full md:flex-1">
              <Text className="mb-8 text-gray-300">
                Get full access to all pro examples with just one month with a Pro
                subscription — from €129.
              </Text>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="text-foreground w-full hover:bg-gray-100 md:w-auto"
                >
                  <Link href="/pro/sign-up">Try it out</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="black"
                  className="w-full bg-white/10 hover:bg-white/20 md:w-auto"
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
          className="mx-auto max-w-lg"
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
      <Text className="mt-2 font-bold">{title}</Text>
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
      <Icon className="text-foreground h-8 w-8" />
      <div className="mb-4 mt-2 text-3xl font-bold">{title}</div>
      <Text variant="light" className="text-md">
        {text}
      </Text>

      <div className="mt-8 flex items-center space-x-4">
        {links?.map((link) => (
          <Button
            key={link.route}
            asChild
            variant="link"
            className="text-primary text-md"
          >
            <Link href={link.route} target={link.target}>
              {link.linkName} <ArrowRightCircleIcon className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}

function StarText() {
  return (
    <span className="from-primary relative inline-flex bg-gradient-to-r to-[#FF99C7] bg-clip-text text-transparent">
      <span>Pro</span>
      <Image
        src={IMG.star}
        alt="star"
        width={20}
        height={20}
        className="absolute left-[40%] h-5 w-5 opacity-50"
      />
      <Image
        src={IMG.star}
        alt="star"
        width={16}
        height={16}
        className="absolute -right-[10px] top-1/2 h-4 w-4 opacity-20"
      />
      <Image
        src={IMG.star}
        alt="star"
        width={12}
        height={12}
        className="absolute bottom-[6px] left-[16px] h-3 w-3 opacity-70"
      />
    </span>
  );
}
