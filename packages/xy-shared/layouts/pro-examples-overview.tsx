import { Fragment } from 'react';
import { DynamicMeta, Folder } from 'nextra';

import { ProjectPreview } from '../components/project-preview';
import { ContentGrid, ContentGridItem } from '../components/ui/content-grid';
import { Heading } from '../components/ui/heading';
import { withProExamplesImageVersion } from '../lib/cached-image-version';
import { getExamplesPageMap } from '../server/example-utils';
import { getFramework } from '../lib/get-framework';

const { framework } = getFramework();

type ProExamplesProps = {
  meta: DynamicMeta;
};

function getThumbnailSrc(exampleName: string, variant: 'light' | 'dark') {
  const darkSuffix = variant === 'dark' ? '-dark' : '';

  return withProExamplesImageVersion(
    `${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/${framework}/${exampleName}/thumbnail${darkSuffix}.jpg`,
  );
}

export async function ProExamplesOverview({ meta }: ProExamplesProps) {
  const pageMap = await getExamplesPageMap();

  return (
    <>
      {pageMap.children.map((_category) => {
        const hasChildren = 'children' in _category;

        if (!hasChildren) {
          return null;
        }

        const category = _category as Folder & { title: string };
        const categoryMeta = meta[category.name];
        const allowedItems =
          categoryMeta &&
          typeof categoryMeta === 'object' &&
          'items' in categoryMeta &&
          categoryMeta.items
            ? (categoryMeta.items as Record<string, unknown>)
            : null;

        if (!allowedItems) {
          return null;
        }

        return (
          <Fragment key={category.title}>
            <Heading className="mt-20" size="sm" id={category.name}>
              {category.title}
            </Heading>
            <ContentGrid className="lg:grid-cols-2 border-none gap-4 lg:gap-8">
              {category.children
                .filter(
                  (example) =>
                    'name' in example &&
                    example.name in allowedItems &&
                    'frontMatter' in example &&
                    !example.frontMatter?.hidden,
                )
                .map(
                  (example) =>
                    'frontMatter' in example && (
                      <ContentGridItem
                        key={example.route}
                        route={example.route}
                        className="border-none hover:bg-transparent py-6 lg:py-8 lg:px-0 group"
                      >
                        <ProjectPreview
                          image={getThumbnailSrc(example.name, 'light')}
                          imageDark={getThumbnailSrc(example.name, 'dark')}
                          imageAlt={example.frontMatter!.title + ' screenshot'}
                          title={example.frontMatter!.title}
                          titleSize="xs"
                          description={example.frontMatter!.description}
                          descriptionVariant="light"
                          linkLabel="See example"
                          linkClassName="text-muted-foreground font-medium text-sm group-hover:text-primary"
                          kicker={category.title.toUpperCase()}
                          kickerSize="xs"
                          imageWrapperClassName="shadow-md bg-transparent border-none p-px rounded-xl pro-example-preview-thumb"
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
