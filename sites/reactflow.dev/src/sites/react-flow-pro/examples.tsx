import {
  BaseLayout,
  ContentGrid,
  ContentGridItem,
  Button,
  Hero,
  ProjectPreview,
  SubscribeSection,
} from 'xy-ui';
import { SparklesIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { getMdxPagesUnderRoute } from '@/utils';
import { getPagesUnderRoute } from 'nextra/context';

function getProExamplesUnderRoute(route) {
  return getMdxPagesUnderRoute(route).filter(
    (page) => page.frontMatter?.sidebar_class_name === 'pro',
  );
}

function getProExamples() {
  const exampleFolders = getPagesUnderRoute('/examples').filter(
    (page) => page.kind === 'Folder',
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
      <SubscribeSection
        btnLink={`${process.env.NEXT_PUBLIC_PRO_PLATFORM_URL}/signup`}
        btnLabel="Sign Up Now"
      />
    </BaseLayout>
  );
}
