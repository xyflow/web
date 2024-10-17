import { ReactNode } from 'react';
import { useConfig } from 'nextra-theme-docs';

import {
  BaseBlogPostLayout,
  getPrevAndNextPagesByTitle,
  type BlogPostFrontmatter,
} from 'xy-shared';

export type TutorialLayoutProps = {
  children: ReactNode;
};

export function TutorialLayout({ children }: TutorialLayoutProps) {
  const { title, frontMatter } = useConfig<BlogPostFrontmatter>();
  const { prev, next } = getPrevAndNextPagesByTitle(title, '/learn/tutorials');

  return (
    <BaseBlogPostLayout frontMatter={frontMatter} prev={prev} next={next}>
      <>{children}</>
    </BaseBlogPostLayout>
  );
}

export default TutorialLayout;
