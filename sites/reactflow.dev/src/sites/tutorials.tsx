import { BookOpenIcon } from '@heroicons/react/24/outline';
import { ContentGrid, ContentGridItem } from '@xyflow/xy-ui';
import { BaseLayout, Hero, ProjectPreview, SubscribeSection } from 'xy-shared';

import { getMdxPagesUnderRoute } from '@/utils';

export default function CaseStudies() {
  return (
    <BaseLayout>
      <Hero
        title="Learn more with tutorials"
        subtitle="Our tutorials provide step-by-step instructions for building MVP apps like mindmaps and audio playgrounds."
        kicker="Tutorials"
        kickerIcon={BookOpenIcon}
        align="center"
      />
      <ContentGrid className="mt-20">
        {getMdxPagesUnderRoute('/learn/tutorials').map((page) => {
          return (
            <ContentGridItem key={page.route} route={page.route}>
              <ProjectPreview
                image={page.frontMatter.image}
                title={page.frontMatter?.title}
                description={page.frontMatter?.intro}
                authors={page.frontMatter?.authors}
                kicker={page.frontMatter?.client}
              />
            </ContentGridItem>
          );
        })}
      </ContentGrid>
      <SubscribeSection />
    </BaseLayout>
  );
}
