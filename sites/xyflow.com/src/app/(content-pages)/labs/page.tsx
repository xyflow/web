import { FC } from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { ContentGrid, ContentGridItem } from '@xyflow/xy-ui';
import { BaseLayout, Hero, ProjectPreview, SubscribeSection } from 'xy-shared';
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
        title="Xyflow Labs"
        subtitle="At xyflow, we’re always experimenting with new ideas and building projects that explore the creative potential of node-based interfaces. Browse our latest playgrounds, prototypes, and behind-the-scenes experiments to see what we’ve been working on."
        kicker="Labs"
        kickerIcon={<SparklesIcon />}
        align="center"
        backgroundVariant="image"
      />

      <ContentGrid className="mt-20">
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
      <SubscribeSection
        btnLink={`${process.env.NEXT_PUBLIC_PRO_PLATFORM_URL}/signup`}
        btnLabel="Sign Up Now"
      />
    </BaseLayout>
  );
};

export default Page;
