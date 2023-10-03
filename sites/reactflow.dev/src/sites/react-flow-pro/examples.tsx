import {
  BaseLayout,
  ContentGrid,
  ContentGridItem,
  Button,
  ProjectPreview,
} from 'xy-ui';
import { SparklesIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Hero from '@/page-sections/hero';
import Subscribe from '@/page-sections/subscribe';
import { getMdxPagesUnderRoute } from '@/utils';
import { getPagesUnderRoute } from 'nextra/context';

function getProExamplesUnderRoute(route) {
  return getMdxPagesUnderRoute(route).filter(
    (page) => page.frontMatter?.sidebar_class_name === 'pro'
  );
}

function getProExamples() {
  const exampleFolders = getPagesUnderRoute('/react-flow/examples').filter(
    (page) => page.kind === 'Folder'
  );

  return exampleFolders.reduce((acc, folder) => {
    const proExamplesInFolder = getProExamplesUnderRoute(folder.route);
    return [...acc, ...proExamplesInFolder];
  }, []);
}

export default function ProExamples() {
  const proExamples = getProExamples();

  return (
    <BaseLayout>
      <Hero
        title="React Flow Pro Examples"
        subtitle="Pro subscribers have access to advanced examples and guides that can be used as a starting point or inspiration for building node-based UIs."
        kicker="xyflow pro"
        kickerIcon={SparklesIcon}
        align="center"
        action={
          <div className="flex gap-2 justify-center">
            <Button size="lg" variant="react">
              Get Started
            </Button>
            <Button asChild size="lg" variant="react-pro">
              <Link href="/react-flow/pro/pricing">Pricing</Link>
            </Button>
          </div>
        }
        showGradient
      />
      <ContentGrid className="mt-20">
        {proExamples.map((page) => (
          <ContentGridItem key={page.route} route={page.route}>
            <ProjectPreview
              image={`/img/pro-examples/${page.name}.jpg`}
              title={page.frontMatter?.title}
              description={page.frontMatter?.description}
              authors={page.frontMatter?.authors}
              linkLabel="View Example"
            />
          </ContentGridItem>
        ))}
      </ContentGrid>
      <Subscribe />
    </BaseLayout>
  );
}
