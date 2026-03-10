import { Fragment } from 'react';
import { ContentGrid, ContentGridItem } from 'xy-shared/components/ui/content-grid';
import { Heading } from 'xy-shared/components/ui/heading';
import { Folder } from 'nextra';
import { ProjectPreview } from 'xy-shared/components/project-preview';

import { meta } from './config';
import { getExamplesPageMap } from 'xy-shared/server/example-utils';

export default async function ProExamples() {
  const { children: pageMap } = await getExamplesPageMap();

  return (
    <>
      {pageMap.map((_category) => {
        const hasChildren = 'children' in _category;
        if (!hasChildren) return;
        const category = _category as Folder & { title: string };
        const categoryMeta = meta[category.name];
        const allowedItems =
          categoryMeta &&
          typeof categoryMeta === 'object' &&
          'items' in categoryMeta &&
          categoryMeta.items
            ? (categoryMeta.items as Record<string, unknown>)
            : null;
        if (!allowedItems) return;
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
                          image={`${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/svelte/${example.name}/thumbnail.jpg`}
                          imageDark={`${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/svelte/${example.name}/thumbnail-dark.jpg`}
                          imageAlt={example.frontMatter!.title + ' screenshot'}
                          title={example.frontMatter!.title}
                          titleSize="xs"
                          description={example.frontMatter!.description}
                          descriptionVariant="light"
                          linkLabel="See example"
                          linkClassName="text-muted-foreground font-medium text-sm group-hover:text-primary"
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
}
