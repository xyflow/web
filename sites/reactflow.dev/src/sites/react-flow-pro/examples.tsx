import Link from 'next/link';
import { getPagesUnderRoute } from 'nextra/context';
import { useSSG } from 'nextra/ssg';
import {
  ContentGrid,
  ContentGridItem,
  Button,
  Heading,
  HeroIcon,
  Text,
  Logo,
  Container,
  Section,
  ListWrapper,
} from '@xyflow/xy-ui';
import { BaseLayout, Hero, ProjectPreview, LayoutBreakout } from 'xy-shared';
import {
  ArrowDownCircleIcon,
  ArrowRightCircleIcon,
  PlusCircleIcon,
  SparklesIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

import { getMdxPagesUnderRoute } from '@/utils';
import Image from 'next/image';
import { ReactNode } from 'react';
import starsvg from '../../../public/img/pro/star.svg';

function getProExamplesUnderRoute(route) {
  return getMdxPagesUnderRoute(route).filter(
    (page) => page.frontMatter?.is_pro_example,
  );
}

function getProExamples() {
  const exampleFolders = getPagesUnderRoute('/examples').filter(
    (page) => page.kind === 'Folder',
  );

  return exampleFolders
    .reduce((acc, folder) => {
      const proExamplesInFolder = getProExamplesUnderRoute(folder.route);
      return [...acc, ...proExamplesInFolder];
    }, [])
    .sort((a, b) => a.frontMatter?.title?.localeCompare(b.frontMatter?.title));
}

export default function ProExamples() {
  const { remoteProExamples } = useSSG();
  const proExamples = getProExamples();

  const examples = proExamples.reduce((result, curr) => {
    const remote = remoteProExamples.find((remote) => remote.id === curr.name);

    if (remote) {
      result.push({
        ...remote,
        route: curr.route,
        image: `${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/${remote.id}/thumbnail.jpg`,
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
            Upgrade your apps with React Flow <StarText /> Examples
          </div>
        }
        subtitle="Get 10 advanced React Flow code examples to use in your node-based UIs, crafted by the React Flow core team."
        action={
          <div className="flex flex-wrap gap-2 items-center">
            <Button
              variant="secondary"
              className="text-black w-full md:w-auto"
              asChild
              size="lg"
            >
              <Link href="/pro">See Subscriptions</Link>
            </Button>
            <SignUpButton />
          </div>
        }
        showGradient
      >
        <Image
          src="/img/pro/pro-examples.png"
          alt="Overview of the pro example apps"
          width={640}
          height={460}
          className="hidden lg:block"
        />
      </Hero>
      <Section>
        <ContentGrid className="lg:grid-cols-4 border-t-0 gap-12">
          <GridItem
            title="By the creators of React Flow"
            text="Feature-complete and crafted by the core team"
            // @ts-ignore
            icon={() => <Logo className="h-8 w-8 text-black" />}
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

      <hr className="border-gray-100" />

      <Section>
        <Container>
          <Image
            src={`${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/shapes/thumbnail.jpg`}
            width={1200}
            height={600}
            objectFit="contain"
            alt="Shapes Example Preview"
          />
        </Container>
        <div className="flex flex-wrap mt-10 gap-2">
          <Heading className="w-full md:w-auto" size="md">
            Shapes
          </Heading>
          <div className="md:max-w-lg ml-auto">
            <Text>
              Custom nodes in cylinder, plus, hexagon, circle, and more shapes.
              Great for showing workflows, flow diagrams, BPMN diagrams, or
              other process mapping. Comes with intuitive UI elements to
              drag-and-drop new nodes onto the canvas, change the color with a
              toolbar, plus dark and light mode.
            </Text>
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <Button asChild size="lg" className="w-full md:w-auto">
                <Link href="/examples/nodes/shapes">Demo</Link>
              </Button>
              <SignUpButton />
            </div>
          </div>
        </div>
      </Section>

      <ContentGrid className="mt-20">
        {examples.map((example) => (
          <ContentGridItem key={example.id} route={example.route}>
            <ProjectPreview
              image={example.image}
              title={example.name}
              description={example.description}
              linkLabel="Demo"
            />
          </ContentGridItem>
        ))}
      </ContentGrid>

      <Section>
        <LayoutBreakout className="max-w-[78rem] lg:ml-0 lg:mr-0 lg:right-0 lg:left-0 lg:w-full lg:px-4 !mt-0">
          <Container
            variant="dark"
            className="max-lg:rounded-none"
            innerClassName="px-4 py-8 flex flex-wrap gap-4 relative w-full items-center shadow-none bg-none bg-gray-100/10 lg:px-20 lg:py-20"
          >
            <div className="md:flex-1">
              <Text className="text-gray-300 mb-2">Get Started</Text>
              <Heading size="md">Boost your apps with React Flow Pro</Heading>
            </div>
            <div className="md:flex-1">
              <Text className="mb-2">
                Get all 10 pro examples with just one month of a Pro
                subscription from 129€
              </Text>
              <div className="flex gap-2 mt-4">
                <Button asChild size="lg">
                  <Link
                    href={`${process.env.NEXT_PUBLIC_PRO_PLATFORM_URL}/signup`}
                  >
                    Try it out
                  </Link>
                </Button>
                <Button asChild size="lg" variant="pro">
                  <Link href="/pro/pricing">See subscription plans</Link>
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
            text="Email us at info@xyflow.com using your university email address"
          />
          <hr className="my-5" />
          <ListItem
            title="For non-commercial open source projects"
            text="Contact us with the link to the github or gitlab repository"
          />
        </ListWrapper>
      </Section>
    </BaseLayout>
  );
}

function ListItem({ title, text }) {
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
      <Icon className="text-black w-8 h-8" />
      <div className="text-3xl font-bold mt-2 mb-4">{title}</div>
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
    </div>
  );
}

function StarText() {
  return (
    <span className="inline-flex relative text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#FF99C7]">
      <span>Pro</span>
      <Image
        src={starsvg}
        alt="star"
        className="absolute h-5 w-5 left-[40%] opacity-50"
      />
      <Image
        src={starsvg}
        alt="star"
        className="absolute h-4 w-4 -right-[10px] top-1/2 opacity-20"
      />
      <Image
        src={starsvg}
        alt="star"
        className="absolute h-3 w-3 left-[16px] bottom-[6px] opacity-70"
      />
    </span>
  );
}

function SignUpButton() {
  return (
    <div className="flex gap-2 items-center flex-wrap w-full md:w-auto">
      <Button asChild size="lg" variant="pro" className="w-full md:w-auto">
        <Link href={`${process.env.NEXT_PUBLIC_PRO_PLATFORM_URL}/signup`}>
          <SparklesIcon className="w-5 h-5 mr-2" /> Sign Up
        </Link>
      </Button>
      <span className="text-sm mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#FA3C92] to-[#969696]">
        to get a free pro example
      </span>
    </div>
  );
}
