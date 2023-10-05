import Link from 'next/link';
import Image from 'next/image';
import { useSSG } from 'nextra/ssg';
import {
  BaseLayout,
  Button,
  Heading,
  Text,
  ContentGrid,
  ContentGridItem,
  HeroFlow,
} from 'xy-ui';
import { SparklesIcon } from '@heroicons/react/24/outline';
import Stats, { StatsDisplay } from '@/page-sections/stats';
import Features from '@/page-sections/features';
import ImageSlider from '@/page-sections/image-slider';
import Section from '@/page-sections/section';
import GettingStarted from '@/page-sections/getting-started';
import ClientLogos from '@/components/client-logos';
import ProjectPreview from '@/components/project-preview';

import FlowA from './flows/flow-a';
import FlowB from './flows/flow-b';
import FlowC from './flows/flow-c';

const features = [
  {
    title: 'Ready out-of-the-box',
    text: 'The things you need are already there: dragging nodes, zooming, panning, selecting multiple nodes, and adding/removing elements are all built-in.',
    route: '/react-flow/docs',
    flowComponent: FlowA,
  },
  {
    title: (
      <>
        Powered by us.
        <br />
        Designed by you.
      </>
    ),
    text: 'React Flow nodes are simply React components, ready for your interactive elements. We play nice with Tailwind and plain old CSS.',
    route: '/react-flow/docs',
    flowComponent: FlowB,
  },
  {
    title: 'All the right plugins',
    text: 'Make more advanced apps with the Background, Minimap, Controls, Panel, NodeToolbar, and NodeResizer components.',
    route: '/react-flow/docs',
    flowComponent: FlowC,
  },
];

const sliderItems = [
  {
    name: 'Stripe Docs',
    text: 'Diagrams for process documentation with interactive nodes',
    content: (
      <Image
        className="rounded-xl object-cover"
        src="/img/showcase/5e7c4463-7dc9-40e9-b3df-7433f6fc9abc.png"
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
        src="/img/showcase/8b4e2243-4e88-40be-89b8-4bfad13460f8.png"
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
        src="/img/showcase/0e29d66b-142b-42c4-a43c-6e3f6501d14b.png"
        alt="TypeForm"
        fill
      />
    ),
  },
];

export default function ReactFlowHome() {
  const { stars = 16000, downloads = 4000 } = useSSG();

  return (
    <BaseLayout>
      <HeroFlow title="React Flow" initialColor="#ff0071" />

      <Section className="mt-6 lg:mt-10">
        <Stats
          stats={[
            { label: 'Github Stars', value: `${(stars / 1000).toFixed(1)}k` },
            {
              label: 'Weekly Installs',
              value: `${(downloads / 1000).toFixed(0)}k`,
            },
            { label: 'License', value: 'MIT' },
          ]}
          description="React Flow is a MIT-licensed open source library. You can help us to ensure the further development and maintenance by subscribing to React Flow Pro."
          link="/pro"
          linkLabel={
            <>
              <SparklesIcon className="w-5 h-5 mr-1" /> React Flow Pro
            </>
          }
        />
      </Section>

      <GettingStarted />

      <Section>
        <Features features={features} />
      </Section>

      <Section>
        <ClientLogos />
      </Section>

      <ImageSlider items={sliderItems} />

      <Section className="lg:flex place-content-between">
        <div>
          <Heading size="md" className="font-bold">
            Some headline thing
          </Heading>
          <Text className="mt-2 mb-4">
            Here is a text about ethical standards and stuff
          </Text>
          <Button asChild>
            <Link href="/">Not sure</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 mt-10 lg:mt-0">
          {[
            { label: 'Github Stars', value: `${(stars / 1000).toFixed(1)}k` },
            {
              label: 'Weekly Installs',
              value: `${(downloads / 1000).toFixed(0)}k`,
            },
            { label: 'License', value: 'MIT' },
            { label: 'License', value: 'MITs' },
          ].map((s) => (
            <StatsDisplay
              key={`${s.label}-${s.value}`}
              className="mb-6 lg:ml-20"
              {...s}
            />
          ))}
        </div>
      </Section>

      <Section className=" lg:mt-48 lg:-mb-24">
        <Heading
          size="md"
          className="text-center font-bold mt-32 mb-12 max-w-lg mx-auto "
        >
          Get started with your first React Flow project
        </Heading>
        <ContentGrid className="grid-cols-1 lg:grid-cols-2">
          <ContentGridItem route="/docs">
            <ProjectPreview
              image="/img/getting-started-thumb.png"
              title="Getting Started Guide"
              description="Build an interactive flow and learn the foundations of React Flow in a few minutes"
            />
          </ContentGridItem>
          <ContentGridItem route="https://xyflow.com/blog/react-flow-and-the-web-audio-api">
            <ProjectPreview
              image="/img/blog/webaudio/web-audio-blog-thumb.png"
              title="Build a browser synth"
              description="Learn React Flow and the Web Audio API while creating an interactive sound-making machine"
            />
          </ContentGridItem>
        </ContentGrid>
      </Section>
    </BaseLayout>
  );
}
