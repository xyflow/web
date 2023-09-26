import { Button } from 'xy-ui';
import { SparklesIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import BaseLayout from '@/layouts/base';
import Hero from '@/page-sections/hero';
import Subscribe from '@/page-sections/subscribe';
import ContentGrid, { ContentGridItem } from '@/components/content-grid';
import ProjectPreview from '@/components/project-preview';
import { getMdxPagesUnderRoute } from '@/utils';

export default function ProExamples() {
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
      />
      <ContentGrid className="mt-20">
        {getMdxPagesUnderRoute('/case-studies').map((page) => {
          return (
            <ContentGridItem key={page.route} route={page.route}>
              <ProjectPreview
                image={page.frontMatter.image}
                title={page.frontMatter?.title}
                description={page.frontMatter?.description}
                authors={page.frontMatter?.authors}
                kicker={page.frontMatter?.client}
              />
            </ContentGridItem>
          );
        })}
      </ContentGrid>
      <Subscribe />
    </BaseLayout>
  );
}
