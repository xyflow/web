import { FC } from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { ContentGrid, ContentGridItem } from '@xyflow/xy-ui';
import { BaseLayout, Hero, ProjectPreview, SubscribeSection } from 'xy-shared';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Labs',
  description:
    'Discover our experimental projects, prototypes, and playgrounds built with React Flow. Explore what we’re working on behind the scenes at xyflow.',
};

const labProjects = [
  {
    title: 'Playground',
    description:
      'An interactive space to experiment with React Flow features, try out new ideas, and visualize node-based logic in real time.',
    image: '/img/labs/playground.png',
    kicker: 'Experiment',
    project_url: 'https://play.reactflow.dev',
  },
  {
    title: 'Drum Machine',
    description:
      'A fun, node-based drum machine built with React Flow. Sequence beats, connect nodes, and explore audio programming in the browser.',
    image: '/img/labs/drum-machine.png',
    kicker: '',
    project_url: '',
  },
  {
    title: 'Collaboration Playground',
    description:
      'A collaborative environment for building node graphs together in real time. Experiment with multiplayer features and shared editing.',
    image: '/img/labs/collaboration-playground.png',
    kicker: 'Collaboration',
    project_url: 'https://collaboration.reactflow.dev',
  },
];

const Page: FC = () => {
  return (
    <BaseLayout>
      <Hero
        title="Xyflow Labs"
        subtitle="At xyflow, we’re always experimenting with new ideas and building projects that explore the creative potential of node-based interfaces. Browse our latest playgrounds, prototypes, and behind-the-scenes experiments to see what we’ve been working on."
        kicker="Labs"
        kickerIcon={<SparklesIcon />}
        align="center"
        backgroundVariant="image"
      />

      <ContentGrid className="mt-10">
        {labProjects.map((project) => (
          <ContentGridItem key={project.title} route={project.project_url}>
            <ProjectPreview
              image={project.image}
              title={project.title}
              description={project.description}
              kicker={project.kicker}
            />
          </ContentGridItem>
        ))}
      </ContentGrid>
      <SubscribeSection
        btnLink={`${process.env.NEXT_PUBLIC_PRO_PLATFORM_URL}/signup`}
        btnLabel="Sign Up Now"
      />
    </BaseLayout>
  );
};

export default Page;
