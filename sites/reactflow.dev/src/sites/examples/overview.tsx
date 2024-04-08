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
  return (
    <>
      <Section>
        <Container>Featured Example</Container>
      </Section>
      <Section>
        <Heading size="sm">Nodes</Heading>
        <ContentGrid className="mt-20 lg:grid-cols-3">
          {/* @ts-ignore */}
          {getMdxPagesUnderRoute('/examples/nodes')
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
      </Section>
      <Section>
        <Heading size="sm">Edges</Heading>
        <ContentGrid className="mt-20 lg:grid-cols-3">
          {/* @ts-ignore */}
          {getMdxPagesUnderRoute('/examples/edges')
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
      </Section>
    </>
  );
}
