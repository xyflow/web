import { BookOpenIcon } from '@heroicons/react/24/outline';
import { ContentGrid, ContentGridItem } from '@xyflow/xy-ui';
import { BaseLayout, Hero, ProjectPreview, SubscribeSection } from 'xy-shared';
import { FC } from 'react';
import { getPageMap } from 'nextra/page-map';
import { MdxFile, NextraMetadata } from 'nextra';

export const metadata: NextraMetadata = {
  asIndexPage: true,
  sidebarTitle: 'Tutorials',
  description: 'Tutorials and in-depth guides on how to build with React Flow.',
};

const Page: FC = async () => {
  const pageMap = (await getPageMap('/learn/tutorials')).filter(
    (item): item is MdxFile => 'frontMatter' in item,
  );
  return (
    <BaseLayout>
      <Hero
        title="Learn more with tutorials"
        subtitle="Step-by-step instructions on how to build React Flow apps and integrating with other libraries. Follow along to learn, or use them as a starting template for your own projects."
        kicker="Tutorials"
        kickerIcon={<BookOpenIcon />}
        align="center"
      />
      <ContentGrid className="mt-20">
        {pageMap.map((page) => (
          <ContentGridItem key={page.route} route={page.route}>
            <ProjectPreview
              image={page.frontMatter.image}
              title={page.frontMatter.title}
              description={page.frontMatter.intro}
              authors={page.frontMatter.authors}
              kicker={page.frontMatter.client}
            />
          </ContentGridItem>
        ))}
      </ContentGrid>
      <SubscribeSection />
    </BaseLayout>
  );
};

export default Page;
