import { FC } from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { ContentGrid, ContentGridItem } from '@xyflow/xy-ui';
import { BaseLayout, Hero, ProjectPreview, SubscribeSection } from 'xy-shared';
import { Metadata } from 'next';
import { getPageMap } from 'nextra/page-map';
import { MdxFile } from 'nextra';

export const metadata: Metadata = {
  title: 'React Flow Pro Case Studies',
  description:
    'Case studies and success stories from some of our React Flow Pro subscribers.',
};

const Page: FC = async () => {
  return (
    <BaseLayout>
      <Hero
        title="What Pro Subscribers build with React Flow"
        subtitle="See how our users build custom node-based apps like workflow editors and diagramming tools"
        kicker="Case Studies"
        kickerIcon={<SparklesIcon />}
        align="center"
        backgroundVariant="image"
      />
      <ContentGrid className="mt-20">
        {(await getPageMap('/pro/case-studies'))
          .filter(
            (page): page is MdxFile => 'name' in page && page.name !== 'index',
          )
          .map((page) => {
            return (
              <ContentGridItem key={page.route} route={page.route}>
                <ProjectPreview
                  image={page.frontMatter.image}
                  title={page.frontMatter.title}
                  description={page.frontMatter.description}
                  authors={page.frontMatter.authors}
                  kicker={page.frontMatter.client}
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
