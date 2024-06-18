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
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Container className="col-span-2 aspect-video">
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
            <Text variant="light">
              This is an overview example React Flow{"'"}s basic features. You
              can see built-in node and edge types, sub flows as well as
              NodeToolbar and NodeResizer components.
            </Text>
            <div className="mt-6 flex flex-wrap gap-2 items-center">
              <Button
                asChild
                size="lg"
                variant="link"
                className="w-full md:w-auto text-black font-medium"
              >
                <Link href="/examples/overview">
                  See example <ArrowRightCircleIcon className="ml-1 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
      <Heading className="mt-20" size="sm">
        Showcase
      </Heading>
      <ContentGrid className="lg:grid-cols-3 border-none gap-4 lg:gap-8 ">
        {examples.map((page) => {
          return (
            <ContentGridItem
              key={page.route}
              route={page.route}
              className="border-none py-6 lg:py-8 lg:px-0 hover:bg-white group"
            >
              <ProjectPreview
                image={`/img${page.route}.jpg`}
                title={page.frontMatter?.title}
                titleSize="xs"
                description={page.frontMatter?.description}
                descriptionVariant="light"
                linkLabel="See example"
                linkClassName="text-gray-900 font-medium"
                kicker={page.route
                  .match(/(?<=\/examples\/)(.*)(?=\/)/g)?.[0]
                  ?.toUpperCase()}
                kickerSize="xs"
              />
            </ContentGridItem>
          );
        })}
      </ContentGrid>
    </>
  );
}
