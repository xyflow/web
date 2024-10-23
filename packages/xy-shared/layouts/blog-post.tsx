import { useContext } from 'react';
import { getPrevAndNextPagesByTitle } from '../lib';
import { BaseBlogPostLayout, BlogPostFrontmatter } from './blog-post-base';
import { UseConfigContext } from '../context/UseConfigContext';

type BlogPostLayoutProps = {
  children: React.ReactNode;
};

export function BlogPostLayout({ children }: BlogPostLayoutProps) {
  const useConfig = useContext(UseConfigContext);
  const { title, frontMatter } = useConfig<BlogPostFrontmatter>();

  const { prev, next } = getPrevAndNextPagesByTitle(title, '/blog');

  return (
    <BaseBlogPostLayout frontMatter={frontMatter} prev={prev} next={next}>
      <>{children}</>
    </BaseBlogPostLayout>
  );
}
