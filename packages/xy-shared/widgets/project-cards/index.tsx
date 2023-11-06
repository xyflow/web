import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import {
  ContentGrid,
  ContentGridItem,
  Text,
  Heading,
  Logo,
  cn,
} from '@xyflow/xy-ui';

const projectsData = {
  reactflow: {
    title: 'React Flow',
    description:
      'A customizable React component for building node-based editors and interactive diagrams',
    route: 'https://reactflow.dev',
    className: 'text-[#ff0071]',
  },
  svelteflow: {
    title: 'Svelte Flow',
    description:
      'A customizable Svelte component for building node-based editors and interactive diagrams',
    route: 'https://svelteflow.dev',
    className: 'text-[#ff4000]',
  },
  xyflow: {
    title: 'xyflow',
    description:
      'The team behind React Flow and Svelte Flow. Read updates and blog posts from us and about how we approach open source development.',
    route: 'https://xyflow.com',
    className: 'text-[#000]',
  },
};

type ProjectCardsProps = {
  projects?: (keyof typeof projectsData)[];
};

function ProjectCards({ projects }: ProjectCardsProps) {
  if (!projects) {
    return null;
  }

  return (
    <ContentGrid className="mt-16 lg:mt-24">
      {projects.map((projectId) => {
        const project = projectsData[projectId];

        return (
          <ContentGridItem key={projectId} route={project.route}>
            <Heading size="sm" className="flex items-center">
              <Logo className={cn('mr-2', project.className)} /> {project.title}
            </Heading>
            <Text className="mt-2 mb-4" variant="light">
              {project.description}
            </Text>
            <span className={cn('flex items-center', project.className)}>
              Visit Website <ArrowRightCircleIcon className="ml-1 w-4 h-4" />
            </span>
          </ContentGridItem>
        );
      })}
    </ContentGrid>
  );
}

export { ProjectCards, type ProjectCardsProps };
