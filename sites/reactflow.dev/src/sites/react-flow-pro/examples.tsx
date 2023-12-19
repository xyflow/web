import Link from 'next/link';
import { getPagesUnderRoute } from 'nextra/context';
import { useSSG } from 'nextra/ssg';
import { ContentGrid, ContentGridItem, Button } from '@xyflow/xy-ui';
import { BaseLayout, Hero, ProjectPreview, SubscribeSection } from 'xy-shared';
import { SparklesIcon } from '@heroicons/react/24/outline';

import { getMdxPagesUnderRoute } from '@/utils';

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
        title="React Flow Pro Examples"
        subtitle="Pro subscribers have access to advanced examples and guides that can be used as a starting point or inspiration for building node-based UIs."
        kicker="React Flow Pro"
        kickerIcon={SparklesIcon}
        align="center"
        action={
          <div className="flex gap-2 justify-center">
            <Button asChild size="lg">
              <Link href={`${process.env.NEXT_PUBLIC_PRO_PLATFORM_URL}/signup`}>
                <SparklesIcon className="w-5 h-5 mr-2" /> Get Started
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/pro/pricing">Pricing</Link>
            </Button>
          </div>
        }
        showGradient
      />
      <ContentGrid className="mt-20">
        {examples.map((example) => (
          <ContentGridItem key={example.id} route={example.route}>
            <ProjectPreview
              image={example.image}
              title={example.name}
              description={example.description}
              linkLabel="View Example"
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
}
