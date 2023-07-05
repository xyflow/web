import BaseLayout from '@/layouts/base';
import HeroSection from '@/components/hero-section';
import ContentGrid, { ContentGridItem } from '@/components/content-grid';
import BlogPostPreview from '@/components/blog-post-preview';
import { getMdxPagesUnderRoute } from '@/utils';

export default function Blog() {
  return (
    <BaseLayout>
      <HeroSection
        title="Blog"
        subtitle="News and updates from React Flow and Svelte Flow."
        align="center"
      />
      <ContentGrid>
        {getMdxPagesUnderRoute('/blog').map((page) => (
          <ContentGridItem key={page.route} route={page.route}>
            <BlogPostPreview
              title={page.frontMatter?.title}
              intro={page.frontMatter?.intro}
              date={page.frontMatter?.date}
              authors={page.frontMatter?.authors}
              route={page.route}
            />
          </ContentGridItem>
        ))}
      </ContentGrid>
    </BaseLayout>
  );
}
