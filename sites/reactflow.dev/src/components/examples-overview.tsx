import { FC, Fragment } from 'react';
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

import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import { getPageMap } from 'nextra/page-map';
import { Folder } from 'nextra';

export const ExamplesOverview: FC = async () => {
  const pageMap = await getPageMap('/examples');
  return (
    <>
      <Section className="!px-0">
        <Link href="/examples/overview" className="hover:no-underline group">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Container className="col-span-2 aspect-video">
              <Image
                src={`${process.env.NEXT_PUBLIC_EXAMPLES_URL}/react/examples/misc/overview/preview.jpg`}
                width={1024}
                height={768}
                alt="Feature Overview Example Preview"
                priority
                style={{ objectFit: 'contain', display: 'block' }}
                className="group-hover:scale-[1.05] transition-transform"
              />
            </Container>
            <div className="mt-auto mb-auto">
              <Heading className="mt-2 mb-4" size="sm">
                Feature Overview
              </Heading>
              <Text variant="light">
                This is an overview example React Flow{"'"}s basic features. You
                can see built-in node and edge types, sub flows as well as
                NodeToolbar and NodeResizer components.
              </Text>
              <div className="mt-6 flex flex-wrap gap-2 items-center group-hover:text-primary">
                <Button
                  asChild
                  size="lg"
                  variant="link"
                  className="w-full md:w-auto text-black font-medium "
                >
                  <>
                    See example <ArrowRightCircleIcon className="w-4 h-4" />
                  </>
                </Button>
              </div>
            </div>
          </div>
        </Link>
      </Section>

      {pageMap.map((_category) => {
        const hasChildren = 'children' in _category;
        if (!hasChildren) return;
        const category = _category as Folder & { title };
        return (
          <Fragment key={category.title}>
            <Heading className="mt-20" size="sm">
              {category.title}
            </Heading>
            <ContentGrid className="lg:grid-cols-3 border-none gap-4 lg:gap-8">
              {category.children.map(
                (example) =>
                  'frontMatter' in example && (
                    <ContentGridItem
                      key={example.route}
                      route={example.route}
                      className="border-none py-6 lg:py-8 lg:px-0 hover:bg-white group"
                    >
                      <ProjectPreview
                        image={
                          example.frontMatter.is_pro_example
                            ? `https://pro-examples.reactflow.dev/${example.name}/thumbnail.jpg`
                            : example.frontMatter.preview_path
                              ? `${process.env.NEXT_PUBLIC_EXAMPLES_URL}/${example.frontMatter.preview_path}`
                              : `${process.env.NEXT_PUBLIC_EXAMPLES_URL}/react${example.route}/preview.jpg`
                        }
                        title={
                          <div className="flex items-center">
                            {example.frontMatter.title}
                            {example.frontMatter.is_pro_example ? (
                              <span className="bg-primary text-white ml-2 px-2 text-sm rounded-lg">
                                Pro
                              </span>
                            ) : null}
                          </div>
                        }
                        titleSize="xs"
                        description={example.frontMatter.description}
                        descriptionVariant="light"
                        linkLabel="See example"
                        linkClassName="text-gray-900 font-medium text-sm group-hover:text-primary"
                        kicker={category.title.toUpperCase()}
                        kickerSize="xs"
                        imageWrapperClassName="p-0 shadow-md border-none"
                      />
                    </ContentGridItem>
                  ),
              )}
            </ContentGrid>
          </Fragment>
        );
      })}
    </>
  );
};
