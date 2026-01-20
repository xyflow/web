import { ContentGrid, ContentGridItem } from 'xy-shared/components/ui/content-grid';
import { BaseLayout } from 'xy-shared/layouts/base';
import { BlogPostPreview } from 'xy-shared/components/blog-post/preview';
import { Hero } from 'xy-shared/components/hero';

import { FC } from 'react';
import { NextraMetadata } from 'nextra';
import { getBlogs } from 'xy-shared/utils/get-blogs';

export const metadata: NextraMetadata = {
  asIndexPage: true,
  title: 'Blog',
  description: 'All the latest news and updates from React Flow and Svelte Flow',
};

const Page: FC = async () => {
  const blogs = await getBlogs();
  return (
    <BaseLayout>
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
    </BaseLayout>
  );
};

export default Page;
