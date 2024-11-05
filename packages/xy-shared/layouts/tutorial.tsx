import { ReactNode, useContext } from 'react';
import { BaseBlogPostLayout, BlogPostFrontmatter } from './blog-post-base';
import { getPrevAndNextPagesByTitle } from '../lib';
import { SharedContext } from '../context/shared-context';

export type TutorialLayoutProps = {
  children: ReactNode;
};

export function TutorialLayout({ children }: TutorialLayoutProps) {
  const { useConfig } = useContext(SharedContext);
  const { title, frontMatter } = useConfig<BlogPostFrontmatter>();
  //   const { prev, next } = getPrevAndNextPagesByTitle(title, '/learn/tutorials');

  return (
    <BaseBlogPostLayout frontMatter={frontMatter}>
      <>{children}</>
    </BaseBlogPostLayout>
  );
}

export default TutorialLayout;
