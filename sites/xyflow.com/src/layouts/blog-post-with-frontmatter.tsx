import { useConfig } from 'nextra-theme-docs';
import {
  BaseBlogPostLayout,
  type BlogPostFrontmatter,
  getPrevAndNextPagesByTitle,
} from 'xy-shared';

export type BlogPostLayoutProps = {
  children: React.ReactNode;
};

export function BlogPostLayout({ children }: BlogPostLayoutProps) {
  const { title, frontMatter } = useConfig<BlogPostFrontmatter>();
  const { prev, next } = getPrevAndNextPagesByTitle(title, '/blog');

  return (
    <BaseBlogPostLayout frontMatter={frontMatter} prev={prev} next={next}>
      <>{children}</>
    </BaseBlogPostLayout>
  );
}

export default BlogPostLayout;
