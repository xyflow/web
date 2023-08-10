import { CheckCircleIcon } from '@heroicons/react/24/outline';

import BaseLayout from '@/layouts/base';
import Hero from '@/page-sections/hero';
import ContentGrid, { ContentGridItem } from '@/components/content-grid';
import ProjectPreview from '@/components/project-preview';
import { getMdxPagesUnderRoute } from '@/utils';

export default function CaseStudies() {
  return (
    <BaseLayout>
      <Hero
        title="How Pro subscribers use React Flow to build"
        subtitle="Check how our users build custom node-based apps like workflow editors and diagramming tools"
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
                kicker={page.frontMatter?.client}
              />
            </ContentGridItem>
          );
        })}
      </ContentGrid>
    </BaseLayout>
  );
}
