import { ContentGrid, ContentGridItem } from '@xyflow/xy-ui';
import { BaseLayout, BlogPostPreview, Hero } from 'xy-shared';

import { FC } from 'react';
import { getPageMap } from 'nextra/page-map';
import { MdxFile, NextraMetadata } from 'nextra';

export const metadata: NextraMetadata = {
  asIndexPage: true,
  title: 'Blog',
  description: 'All the latest news and updates from React Flow and Svelte Flow'
}

const Page: FC = async () => {
  const pageMap = (await getPageMap('/blog')) as MdxFile[]
  return (
    <BaseLayout>
      <Hero
        title="Blog"
        subtitle="News and updates from the team behind React Flow and Svelte Flow."
        align="center"
      />
      <div className="-mx-6 sm:mx-auto">
        <ContentGrid>
          {pageMap.map((page) => (
            <ContentGridItem key={page.route} route={page.route}>
              <BlogPostPreview
                title={page.frontMatter.title}
                intro={page.frontMatter.intro}
                date={page.frontMatter.date}
                authors={page.frontMatter.authors}
                headingSize="md"
              />
            </ContentGridItem>
          ))}
        </ContentGrid>
      </div>
    </BaseLayout>
  );
}

export default Page
