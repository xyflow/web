import { Fragment, useMemo } from 'react';
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
  const examples = useMemo(
    () =>
      [
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
      ]
        .filter((example) =>
          category
            ? example.frontMatter?.category === category
            : !example.frontMatter?.category,
        )
        .reduce((res, example) => {
          const category = example.route.match(
            /(?<=\/examples\/)(.*)(?=\/)/g,
          )?.[0];

          res[category] = res[category] || [];
          res[category].push({ ...example, category });

          return res;
        }, {}),
    [],
  );

  return (
    <>
      <Section className="!px-0">
        <Link href="/examples/overview">
          <>
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
                <Heading className="mt-2 mb-4" size="sm">
                  Feature Overview
                </Heading>
                <Text variant="light">
                  This is an overview example React Flow{"'"}s basic features.
                  You can see built-in node and edge types, sub flows as well as
                  NodeToolbar and NodeResizer components.
                </Text>
                <div className="mt-6 flex flex-wrap gap-2 items-center">
                  <Button
                    asChild
                    size="lg"
                    variant="link"
                    className="w-full md:w-auto text-black font-medium"
                  >
                    See example{' '}
                    <ArrowRightCircleIcon className="ml-1 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        </Link>
      </Section>

      {Object.keys(examples).map((category) => {
        return (
          <Fragment key={category}>
            <Heading className="mt-20" size="sm">
              {`${category.charAt(0).toUpperCase()}${category.slice(1)}`}
            </Heading>
            <ContentGrid className="lg:grid-cols-3 border-none gap-4 lg:gap-8">
              {examples[category].map((example) => {
                return (
                  <ContentGridItem
                    key={example.route}
                    route={example.route}
                    className="border-none py-6 lg:py-8 lg:px-0 hover:bg-white group"
                  >
                    <ProjectPreview
                      image={`/img${example.route}.jpg`}
                      title={
                        <div className="flex items-center">
                          {example.frontMatter?.title}
                          {example.frontMatter?.is_pro_example ? (
                            <span className="bg-primary text-white ml-2 px-2 text-sm rounded-lg">
                              Pro
                            </span>
                          ) : null}
                        </div>
                      }
                      titleSize="xs"
                      description={example.frontMatter?.description}
                      descriptionVariant="light"
                      linkLabel="See example"
                      linkClassName="text-gray-900 font-medium text-sm"
                      kicker={category?.toUpperCase()}
                      kickerSize="xs"
                      imageWrapperClassName="p-0 shadow-md border-none"
                    />
                  </ContentGridItem>
                );
              })}
            </ContentGrid>
          </Fragment>
        );
      })}
    </>
  );
}
