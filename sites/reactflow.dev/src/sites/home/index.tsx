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
  ImageSlider,
  ProjectPreview,
  Section,
  Features,
  GettingStarted,
  Stats,
  StatsDisplay,
} from 'xy-ui';
import { SparklesIcon, BoltIcon } from '@heroicons/react/24/outline';
import ClientLogos from '@/components/client-logos';

import FlowA from './flows/flow-a';
import FlowB from './flows/flow-b';
import FlowC from './flows/flow-c';

const features = [
  {
    title: 'Ready out-of-the-box',
    text: 'The things you need are already there: dragging nodes, zooming, panning, selecting multiple nodes, and adding/removing elements are all built-in.',
    route: '/learn',
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
    route: '/learn',
    flowComponent: FlowB,
  },
  {
    title: 'All the right plugins',
    text: 'Make more advanced apps with the Background, Minimap, Controls, Panel, NodeToolbar, and NodeResizer components.',
    route: '/learn',
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

export default function ReactFlowHome() {
  const { stars = 16000, downloads = 4000 } = useSSG();

  return (
    <BaseLayout>
      <HeroFlow
        title="React Flow"
        initialColor="#ff0071"
        subtitle="A customizable React component for building node-based editors and interactive diagrams"
        action={
          <div className="flex">
            <Button size="lg" asChild className="mr-3 ">
              <Link href="/learn">
                <BoltIcon className="w-5 h-5 mr-1" />
                Quickstart
              </Link>
            </Button>
            <Button size="lg" variant="pro" asChild>
              <Link href="/pro">
                <SparklesIcon className="w-5 h-5 mr-1" /> React Flow Pro
              </Link>
            </Button>
          </div>
        }
      />

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

      <GettingStarted
        libraryName="React Flow"
        packageName="@xyflow/react-flow"
      />

      <Section>
        <Features features={features} />
      </Section>

      <Section>
        <ClientLogos />
      </Section>

      <ImageSlider items={sliderItems} />

      <Section>
        <Heading
          size="md"
          className="text-center font-bold mt-32 mb-12 max-w-lg mx-auto "
        >
          Get started with your first React Flow project
        </Heading>
        <ContentGrid className="grid-cols-1 lg:grid-cols-2">
          <ContentGridItem route="/learn">
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

      <Section className="lg:flex place-content-between">
        <div>
          <Heading size="md" className="font-bold">
            Questions?
          </Heading>
          <Text className="mt-2 mb-4">Contact Us</Text>
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
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
    </BaseLayout>
  );
}
