import Link from 'next/link';
import Image from 'next/image';
import { Position } from '@xyflow/system';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';

import {
  BaseLayout,
  ContentGrid,
  ContentGridItem,
  Text,
  Heading,
  Button,
  Logo,
  Hero,
  ImageSlider,
  Handle,
  HeadlineNode,
  Section,
} from 'xy-ui';

import aboutImage from '../../public/img/about.jpg';

const sliderItems = [
  {
    name: 'Stripe Docs',
    text: 'Diagrams for process documentation with interactive nodes',
    content: (
      <Image
        className="rounded-xl object-cover"
        src="/img/featured/stripe.png"
        alt="Stripe Docs"
        fill
      />
    ),
  },
  {
    name: 'DoubleLoop',
    text: 'Node-based dashboard builder to monitor business metrics',
    content: (
      <Image
        className="rounded-xl object-cover"
        src="/img/featured/doubleloop.png"
        alt="DoubleLoop"
        fill
      />
    ),
  },
  {
    name: 'TypeForm',
    text: 'Interactive tool to build and visualize complex survey logic',
    content: (
      <Image
        className="rounded-xl object-cover"
        src="/img/featured/typeform.png"
        alt="TypeForm"
        fill
      />
    ),
  },
];

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
                svgClassName="-z-10 stroke-purple-600"
                handleClassName="border-purple-600"
              />
              <Handle
                type="target"
                position={Position.Left}
                id="xy-wire-target"
                className="top-1/2 -left-[9px]"
                svgClassName="stroke-purple-600"
                handleClassName="border-purple-600"
              />
            </HeadlineNode>{' '}
            your{' '}
            <HeadlineNode>
              <Handle
                type="source"
                position={Position.Bottom}
                id="xy-ideas"
                to="xy-xyflow"
                className="-bottom-[9px] right-4"
                svgClassName="-z-10 stroke-purple-600"
                handleClassName="border-purple-600"
              />
              ideas
            </HeadlineNode>{' '}
            with{' '}
            <HeadlineNode>
              <Handle
                type="target"
                id="xy-xyflow"
                position={Position.Right}
                className="top-1/2 -translate-y-1/2 -right-[9px]"
                svgClassName="stroke-purple-600"
                handleClassName="border-purple-600"
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

      <ImageSlider items={sliderItems} className="my-16 lg:my-24" />

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
          <Logo className="mr-2 text-[#ff0071]" /> React Flow
        </Heading>
        <Text className="mt-2 mb-4" variant="light">
          A customizable React component for building node-based editors and
          interactive diagrams
        </Text>
        <span className="text-[#ff0071] flex items-center">
          Read More <ArrowRightCircleIcon className="ml-1 w-4 h-4" />
        </span>
      </ContentGridItem>

      <ContentGridItem route="/svelte-flow">
        <Heading size="sm" className="flex items-center">
          <Logo className="mr-2 text-[#ff4000]" /> Svelte Flow
        </Heading>
        <Text className="mt-2 mb-4" variant="light">
          A customizable Svelte component for building node-based editors and
          interactive diagrams
        </Text>
        <span className="text-[#ff4000] flex items-center">
          Read More <ArrowRightCircleIcon className="ml-1 w-4 h-4" />
        </span>
      </ContentGridItem>
    </ContentGrid>
  );
}
