import { RxCheckCircled } from 'react-icons/rx';

import BaseLayout from '@/layouts/base';
import HeroSection from '@/components/hero-section';
import ContentGrid, { ContentGridItem } from '@/components/content-grid';
import CaseStudyPreview from '@/components/case-study-preview';
import { getMdxPagesUnderRoute } from '@/utils';

function Kicker() {
  return (
    <>
      <RxCheckCircled className="inline-block w-4 h-4 mr-1" />
      Success stories
    </>
  );
}

export default function CaseStudies() {
  return (
    <BaseLayout>
      <HeroSection
        title="How Pro subscribers use React Flow to build"
        subtitle="Check how our users build custom node-based apps like workflow editors and diagramming tools"
        kicker={<Kicker />}
        align="center"
      />
      <ContentGrid className="mt-20">
        {getMdxPagesUnderRoute('/case-studies').map((page) => {
          return (
            <ContentGridItem key={page.route} route={page.route}>
              <CaseStudyPreview
                title={page.frontMatter?.title}
                description={page.frontMatter?.description}
                client={page.frontMatter?.client}
                route={page.route}
              />
            </ContentGridItem>
          );
        })}
      </ContentGrid>
    </BaseLayout>
  );
}
