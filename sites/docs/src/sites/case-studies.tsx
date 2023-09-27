import { CheckCircleIcon } from '@heroicons/react/24/outline';

import { Heading, Button } from 'xy-ui';
import { SparklesIcon } from '@heroicons/react/24/outline';

import Section from '@/page-sections/section';

import Link from 'next/link';
import BaseLayout from '@/layouts/base';
import Hero from '@/page-sections/hero';
import ContentGrid, { ContentGridItem } from '@/components/content-grid';
import ProjectPreview from '@/components/project-preview';
import { getMdxPagesUnderRoute } from '@/utils';

export default function CaseStudies() {
  return (
    <BaseLayout>
      <Hero
        title="What Pro Subscribers build with React Flow"
        subtitle="See how our users build custom node-based apps like workflow editors and diagramming tools"
        kicker="Success Stories"
        kickerIcon={CheckCircleIcon}
        align="center"
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
      <Section className="mx-auto lg:max-w-[800px]">
        <Heading size="sm" as="h3" className="text-center mb-12 mt-32">
          Get Pro examples, prioritized bug reports, 1:1 support from the
          maintainers, and more with React Flow Pro
        </Heading>

        <div className="flex justify-center space-x-8">
          <Button size="lg" asChild variant="react-pro">
            <Link href="/react-flow/pro" className="flex items-center">
              <SparklesIcon className="w-5 h-5 mr-1" />
              React Flow Pro
            </Link>
          </Button>
        </div>
      </Section>
    </BaseLayout>
  );
}
