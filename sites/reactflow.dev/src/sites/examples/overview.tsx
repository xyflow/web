import Image from 'next/image';
import {
  Text,
  Container,
  ContentGrid,
  ContentGridItem,
  Heading,
  Section,
  Button,
  Link,
} from '@xyflow/xy-ui';
import { ProjectPreview } from 'xy-shared';

import { getMdxPagesUnderRoute } from '@/utils';

export default function ExamplesOverviewPage({
  category,
}: {
  category?: string;
}) {
  const examples = [
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
  ].filter((example) =>
    category
      ? example.frontMatter?.category === category
      : !example.frontMatter?.category,
  );

  return (
    <>
      <Section className="!px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Container>
            <Image
              src="/img/examples/overview.jpg"
              width={1024}
              height={768}
              alt="Feature Overview Example Preview"
              priority
              style={{ objectFit: 'contain', display: 'block' }}
            />
          </Container>
          <div className="mt-auto mb-auto">
            <Heading
              className="nx-mt-2 nx-text-4xl nx-font-bold nx-tracking-tight nx-text-slate-900 dark:nx-text-slate-100 mb-4"
              size="md"
            >
              Feature Overview
            </Heading>
            <Text>
              This is an overview example React Flow's basic features. You can
              see built-in node and edge types, sub flows as well as NodeToolbar
              and NodeResizer components.
            </Text>
            <div className="mt-6 flex flex-wrap gap-2 items-center">
              <Button asChild size="lg" className="w-full md:w-auto">
                <Link href="/examples/overview">Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
      <ContentGrid className="mt-20 lg:grid-cols-3">
        {examples.map((page) => {
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
