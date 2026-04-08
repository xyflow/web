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
import {
  withExamplesImageVersion,
  withProExamplesImageVersion,
} from '../lib/cached-image-version';
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
    return withProExamplesImageVersion(
      `${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/${framework}/${exampleName}/thumbnail.jpg`,
    );
  }

  if (previewPath) {
    return `${process.env.NEXT_PUBLIC_EXAMPLES_URL}/${previewPath}`;
  }

  return withExamplesImageVersion(
    `${process.env.NEXT_PUBLIC_EXAMPLES_URL}/${framework}/${route}/preview.jpg`,
  );
}

function getExampleImageDark(
  framework: 'react' | 'svelte',
  route: string,
  previewPath: string | undefined,
  isProExample: boolean,
  exampleName: string,
) {
  if (isProExample) {
    return withProExamplesImageVersion(
      `${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/${framework}/${exampleName}/thumbnail-dark.jpg`,
    );
  }

  if (previewPath) {
    return `${process.env.NEXT_PUBLIC_EXAMPLES_URL}/${previewPath.replace('.jpg', '-dark.jpg')}`;
  }

  return withExamplesImageVersion(
    `${process.env.NEXT_PUBLIC_EXAMPLES_URL}/${framework}/${route}/preview-dark.jpg`,
  );
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
          className="group hover:no-underline"
          prefetch={false}
        >
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Container className="col-span-2 aspect-video border-none">
              <ThemeAwareImage
                lightSrc={withExamplesImageVersion(
                  `${process.env.NEXT_PUBLIC_EXAMPLES_URL}/${featureOverviewPreviewRoute}/preview.jpg`,
                )}
                darkSrc={withExamplesImageVersion(
                  `${process.env.NEXT_PUBLIC_EXAMPLES_URL}/${featureOverviewPreviewRoute}/preview-dark.jpg`,
                )}
                width={1024}
                height={768}
                alt="Feature Overview Example Preview"
                preload
                style={{ objectFit: 'contain' }}
                className="transition-transform group-hover:scale-[1.05]"
              />
            </Container>
            <div className="mb-auto mt-auto">
              <Heading className="mb-4 mt-2" size="sm">
                Feature Overview
              </Heading>
              <Text variant="light">{getFeatureOverviewDescription(library)}</Text>
              <div className="group-hover:text-primary mt-6 flex flex-wrap items-center gap-2">
                <Button
                  asChild
                  size="lg"
                  variant="link"
                  className="w-full font-medium text-black md:w-auto"
                >
                  <>
                    See example <ArrowRightCircleIcon className="h-4 w-4" />
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
            <ContentGrid className="gap-4 border-none lg:grid-cols-3 lg:gap-8">
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
                        className="group border-none py-6 hover:bg-transparent lg:px-0 lg:py-8"
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
                                <span className="bg-primary ml-2 rounded-lg px-2 text-sm text-white">
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
