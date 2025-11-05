import { ContentGrid, ContentGridItem } from '@xyflow/xy-ui';
import { BaseLayout, BlogPostPreview, Hero } from 'xy-shared';

import { FC } from 'react';
import { NextraMetadata } from 'nextra';
import { getBlogs } from '@/utils';

export const metadata: NextraMetadata = {
  asIndexPage: true,
  title: 'Blog',
  description: 'All the latest news and updates from React Flow and Svelte Flow',
};

const Page: FC = async () => {
  const blogs = await getBlogs();
  return (
    <BaseLayout>
      <div data-pagefind-ignore>
        <Hero
          title="Blog"
          subtitle="News and updates from the team behind React Flow and Svelte Flow."
          align="center"
        />
        <div className="-mx-6 sm:mx-auto">
          <ContentGrid>
            {blogs.map((page) => (
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
      </div>
    </BaseLayout>
  );
};

export default Page;
