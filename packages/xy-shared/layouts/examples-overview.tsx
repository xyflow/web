import { Fragment } from 'react';
import { Folder } from 'nextra';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';

import { ProjectPreview } from '../components/project-preview';
import { ThemeAwareImage } from '../components/theme-aware-image';
import { Button } from '../components/ui/button';
import { Container } from '../components/ui/container';
import { ContentGrid, ContentGridItem } from '../components/ui/content-grid';
import { Heading } from '../components/ui/heading';
import { Link } from '../components/ui/link';
import { Section } from '../components/ui/section';
import { Text } from '../components/ui/text';
import { getFramework } from '../lib/get-framework';
import { getExamplesPageMap } from '../server/example-utils';
import clsx from 'clsx';

function getFeatureOverviewPreviewRoute(framework: 'react' | 'svelte') {
  if (framework === 'svelte') {
    return 'svelte/examples/misc/feature-overview';
  }

  return 'react/examples/misc/overview';
}

function getFeatureOverviewDescription(library: string) {
  return `This is an overview example of ${library}'s basic features. You can see built-in node and edge types, sub flows as well as NodeToolbar and NodeResizer components.`;
}

function getExampleImage(
  framework: 'react' | 'svelte',
  route: string,
  previewPath: string | undefined,
  isProExample: boolean,
  exampleName: string,
) {
  if (isProExample) {
    return `${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/${framework}/${exampleName}/thumbnail.jpg?v=13`;
  }

  if (previewPath) {
    return `${process.env.NEXT_PUBLIC_EXAMPLES_URL}/${previewPath}`;
  }

  return `${process.env.NEXT_PUBLIC_EXAMPLES_URL}/${framework}/${route}/preview.jpg?v=13`;
}

function getExampleImageDark(
  framework: 'react' | 'svelte',
  route: string,
  previewPath: string | undefined,
  isProExample: boolean,
  exampleName: string,
) {
  if (isProExample) {
    return `${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/${framework}/${exampleName}/thumbnail-dark.jpg?v=13`;
  }

  if (previewPath) {
    return `${process.env.NEXT_PUBLIC_EXAMPLES_URL}/${previewPath.replace('.jpg', '-dark.jpg')}`;
  }

  return `${process.env.NEXT_PUBLIC_EXAMPLES_URL}/${framework}/${route}/preview-dark.jpg?v=13`;
}

const { framework, library } = getFramework();

async function ExamplesOverviewLayout() {
  const pageMap = await getExamplesPageMap();
  const featureOverviewPreviewRoute = getFeatureOverviewPreviewRoute(framework);

  return (
    <>
      <Section className="px-0!">
        <Link
          href="/examples/overview"
          className="hover:no-underline group"
          prefetch={false}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Container className="col-span-2 aspect-video border-none">
              <ThemeAwareImage
                lightSrc={`${process.env.NEXT_PUBLIC_EXAMPLES_URL}/${featureOverviewPreviewRoute}/preview.jpg?v=13`}
                darkSrc={`${process.env.NEXT_PUBLIC_EXAMPLES_URL}/${featureOverviewPreviewRoute}/preview-dark.jpg?v=13`}
                width={1024}
                height={768}
                alt="Feature Overview Example Preview"
                preload
                style={{ objectFit: 'contain' }}
                className="group-hover:scale-[1.05] transition-transform"
              />
            </Container>
            <div className="mt-auto mb-auto">
              <Heading className="mt-2 mb-4" size="sm">
                Feature Overview
              </Heading>
              <Text variant="light">{getFeatureOverviewDescription(library)}</Text>
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

      {pageMap.children.map((_category) => {
        const hasChildren = 'children' in _category;
        if (!hasChildren) return null;

        const category = _category as Folder & { title: string };

        return (
          <Fragment key={category.title}>
            <Heading className="mt-20" size="sm" id={category.name}>
              {category.title}
            </Heading>
            <ContentGrid className="lg:grid-cols-3 border-none gap-4 lg:gap-8">
              {category.children
                .filter(
                  (example) => !('frontMatter' in example && example.frontMatter?.hidden),
                )
                .map(
                  (example) =>
                    'frontMatter' in example &&
                    example.frontMatter && (
                      <ContentGridItem
                        key={example.route}
                        route={example.route}
                        className="border-none hover:bg-transparent py-6 lg:py-8 lg:px-0 group"
                      >
                        <ProjectPreview
                          image={getExampleImage(
                            framework,
                            example.route,
                            example.frontMatter.preview_path,
                            example.frontMatter.is_pro_example,
                            example.name,
                          )}
                          imageDark={getExampleImageDark(
                            framework,
                            example.route,
                            example.frontMatter.preview_path,
                            example.frontMatter.is_pro_example,
                            example.name,
                          )}
                          imageAlt={example.frontMatter.title + ' screenshot'}
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
                          linkClassName="text-muted-foreground font-medium text-sm group-hover:text-primary"
                          kicker={category.title.toUpperCase()}
                          kickerSize="xs"
                          imageWrapperClassName={clsx(
                            'shadow-md bg-transparent',
                            example.frontMatter.is_pro_example
                              ? 'border-none bg-transparent p-px rounded-xl pro-example-preview-thumb'
                              : 'p-0',
                          )}
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
}

export { ExamplesOverviewLayout };
