import {
  Card,
  Container,
  ContentGrid,
  ContentGridItem,
  Heading,
  Section,
} from '@xyflow/xy-ui';
import { ProjectPreview } from 'xy-shared';

import { getMdxPagesUnderRoute } from '@/utils';

export default function CaseStudies() {
  const allExamples = [
    /* @ts-ignore */
    ...getMdxPagesUnderRoute('/examples/nodes'),
    /* @ts-ignore */
    ...getMdxPagesUnderRoute('/examples/edges'),
    /* @ts-ignore */
    ...getMdxPagesUnderRoute('/examples/layout'),
    /* @ts-ignore */
    ...getMdxPagesUnderRoute('/examples/interaction'),
    /* @ts-ignore */
    ...getMdxPagesUnderRoute('/examples/styling'),
    /* @ts-ignore */
    ...getMdxPagesUnderRoute('/examples/misc'),
  ].sort(
    (a, b) =>
      (b.frontMatter?.description?.length || 0) -
      (a.frontMatter?.description?.length || 0),
  );

  return (
    <>
      <ContentGrid className="mt-20 lg:grid-cols-3">
        {allExamples.map((page) => {
          return (
            <ContentGridItem key={page.route} route={page.route}>
              <ProjectPreview
                image={`/img${page.route}.jpg`}
                title={page.frontMatter?.title}
                description={page.frontMatter?.description}
                authors={page.frontMatter?.authors}
                kicker={page.route
                  .match(/(?<=\/examples\/)(.*)(?=\/)/g)?.[0]
                  ?.toUpperCase()}
              />
            </ContentGridItem>
          );
        })}
      </ContentGrid>
    </>
  );
}
