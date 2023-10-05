import {
  BaseLayout,
  ContentGrid,
  ContentGridItem,
  BlogPostPreview,
} from 'xy-ui';
import Hero from '@/page-sections/hero';
import { getMdxPagesUnderRoute } from '@/utils';

export default function Blog() {
  return (
    <BaseLayout>
      <Hero
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
            />
          </ContentGridItem>
        ))}
      </ContentGrid>
    </BaseLayout>
  );
}
