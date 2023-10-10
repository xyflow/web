import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Subscribe from '@/page-sections/subscribe';
import {
  BaseLayout,
  ContentGrid,
  ContentGridItem,
  ProjectPreview,
  Hero,
} from 'xy-ui';
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
        {getMdxPagesUnderRoute('/pro/case-studies')
          .filter((page) => page.name !== 'index')
          .map((page) => {
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
