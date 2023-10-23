import Image from 'next/image';
import { Position } from '@xyflow/system';

import {
  BaseLayout,
  Hero,
  ImageSlider,
  Handle,
  HeadlineNode,
  ProjectCards,
  AboutSection,
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

      <ProjectCards projects={['reactflow', 'svelteflow']} />

      <ImageSlider
        buttonLink="https://reactflow.dev/showcase"
        items={sliderItems}
        className="my-16 lg:my-24"
      />

      <AboutSection colorizeImage={false} imageSrc={aboutImage} />

      <ProjectCards projects={['reactflow', 'svelteflow']} />
    </BaseLayout>
  );
}
