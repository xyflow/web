import Link from 'next/link';
import Image from 'next/image';
import { Position } from '@xyflow/system';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';

import { Text, Heading, Button } from 'xy-ui';
import BaseLayout from '@/layouts/base';
import Hero from '@/page-sections/hero';
import ShowcaseOverview from '@/page-sections/showcase-overview';
import HeadlineNode from '@/components/headline-node';
import Handle from '@/components/handle';
import ContentGrid, { ContentGridItem } from '@/components/content-grid';
import Logo from '@/components/logo';
import Section from '@/page-sections/section';

import aboutImage from '../../public/img/about.jpg';

export default function XYFlowHome() {
  return (
    <BaseLayout>
      <Hero
        title={
          <>
            <HeadlineNode>
              Wire
              <Handle
                type="source"
                position={Position.Right}
                id="xy-wire-source"
                to="xy-wire-target"
                className="-left-[100vw] top-1/2"
                variant="xyflow"
                svgClassName="-z-10"
              />
              <Handle
                type="target"
                position={Position.Left}
                id="xy-wire-target"
                className="top-1/2 -left-2"
                variant="xyflow"
              />
            </HeadlineNode>{' '}
            your{' '}
            <HeadlineNode>
              <Handle
                type="source"
                position={Position.Bottom}
                id="xy-ideas"
                to="xy-xyflow"
                className="bottom-0 right-4"
                variant="xyflow"
                svgClassName="-z-10"
              />
              ideas
            </HeadlineNode>{' '}
            with{' '}
            <HeadlineNode>
              <Handle
                type="target"
                id="xy-xyflow"
                position={Position.Right}
                className="top-1/2 -translate-y-1/2 right-0"
                variant="xyflow"
              />
              xyflow
            </HeadlineNode>
          </>
        }
        subtitle="Powerful open source libraries for building node-based UIs with React or Svelte. Ready out-of-the-box and infinitely customizable"
        align="center"
        size="xl"
        showGradient
      />

      <LibraryCards />

      <ShowcaseOverview className="my-16 lg:my-24" />

      <Section>
        <Heading size="sm" as="h3" className="text-center mb-2">
          About xyflow
        </Heading>
        <Text className="text-center max-w-lg mx-auto mb-6" variant="light">
          We are Christopher, Hayleigh, John, and Moritz. We are the maintainers
          of React Flow, Svelte Flow, and the communities around them
        </Text>

        <div className="flex justify-center space-x-8 mb-16">
          <Button asChild variant="link">
            <Link href="/blog" className="flex items-center">
              Blog <ArrowRightCircleIcon className="w-4 h-4 ml-1" />
            </Link>
          </Button>
          <Button asChild variant="link">
            <Link href="/about" className="flex items-center">
              About us <ArrowRightCircleIcon className="w-4 h-4 ml-1" />
            </Link>
          </Button>
          <Button asChild variant="link">
            <Link href="/open-source" className="flex items-center">
              Open Source <ArrowRightCircleIcon className="w-4 h-4 ml-1" />
            </Link>
          </Button>
          <Button asChild variant="link">
            <Link href="/contact" className="flex items-center">
              Contact Us <ArrowRightCircleIcon className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>

        <Image src={aboutImage} alt="xyflow team" />
      </Section>

      <LibraryCards />
    </BaseLayout>
  );
}

function LibraryCards() {
  return (
    <ContentGrid className="mt-16 lg:mt-24">
      <ContentGridItem route="/react-flow">
        <Heading size="sm" className="flex items-center">
          <Logo variant="react" className="mr-2" /> React Flow
        </Heading>
        <Text className="mt-2 mb-4" variant="light">
          A customizable React component for building node-based editors and
          interactive diagrams
        </Text>
        <Link href="/react-flow" className="text-react flex items-center">
          Read More <ArrowRightCircleIcon className="ml-1 w-4 h-4" />
        </Link>
      </ContentGridItem>

      <ContentGridItem route="/svelte-flow">
        <Heading size="sm" className="flex items-center">
          <Logo variant="svelte" className="mr-2" /> Svelte Flow
        </Heading>
        <Text className="mt-2 mb-4" variant="light">
          A customizable Svelte component for building node-based editors and
          interactive diagrams
        </Text>
        <Link href="/svelte-flow" className="text-svelte flex items-center">
          Read More <ArrowRightCircleIcon className="ml-1 w-4 h-4" />
        </Link>
      </ContentGridItem>
    </ContentGrid>
  );
}
