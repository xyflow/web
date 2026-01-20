import { FC } from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { ContentGrid, ContentGridItem } from 'xy-shared/components/ui/content-grid';
import { BaseLayout } from 'xy-shared/layouts/base';
import { Hero } from 'xy-shared/components/hero';
import { ProjectPreview } from 'xy-shared/components/project-preview';
import { SubscribeSection } from 'xy-shared/components/subscribe-section';
import { Metadata } from 'next';
import { getPageMap } from 'nextra/page-map';
import { MdxFile } from 'nextra';

export const metadata: Metadata = {
  title: 'Labs',
  description:
    'Discover our experimental projects, prototypes, and playgrounds built with React Flow. Explore what we’re working on behind the scenes at xyflow.',
};

const Page: FC = async () => {
  return (
    <BaseLayout>
      <Hero
        title="xyflow Labs"
        subtitle="A collection of experiments and demos we've created with React Flow and Svelte Flow to explore the possibilities of our libraries."
        kicker="Projects"
        kickerIcon={<SparklesIcon />}
        align="center"
        backgroundVariant="image"
      />

      <ContentGrid className="mt-20 relative z-1">
        {(await getPageMap('/labs'))
          .filter((page): page is MdxFile => 'name' in page && page.name !== 'index')
          .map((page) => {
            return (
              <ContentGridItem key={page.route} route={page.route}>
                <ProjectPreview
                  image={page.frontMatter!.image}
                  title={page.frontMatter!.title}
                  description={page.frontMatter!.description}
                  authors={page.frontMatter!.authors}
                  kicker={page.frontMatter!.client}
                />
              </ContentGridItem>
            );
          })}
      </ContentGrid>
      <SubscribeSection btnLink="https://reactflow.dev/pro" btnLabel="Sign Up Now" />
    </BaseLayout>
  );
};

export default Page;
