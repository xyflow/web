import Link from 'next/link';
import Image from 'next/image';
import { Position } from '@xyflow/system';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';

import {
  BaseLayout,
  Text,
  Heading,
  Button,
  Hero,
  ImageSlider,
  Handle,
  HeadlineNode,
  Section,
} from 'xy-ui';

import LibraryCards from '@/components/library-cards';
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
          <div className="max-sm:text-[42px] max-md:leading-[1.8]">
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
          </div>
        }
        subtitle="Powerful open source libraries for building node-based UIs with React or Svelte. Ready out-of-the-box and infinitely customizable"
        align="center"
        size="xl"
        showGradient
      />

      <LibraryCards />

      <ImageSlider
        buttonLink="https://reactflow.dev/showcase"
        items={sliderItems}
        className="my-16 lg:my-24"
      />

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
