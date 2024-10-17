import { ReactNode, useContext } from 'react';
import { BaseBlogPostLayout, BlogPostFrontmatter } from './blog-post-base';
import { getPrevAndNextPagesByTitle } from '../lib';
import { UseConfigContext } from '../context/UseConfigContext';

export type TutorialLayoutProps = {
  children: ReactNode;
};

export function TutorialLayout({ children }: TutorialLayoutProps) {
  const useConfig = useContext(UseConfigContext);
  const { title, frontMatter } = useConfig<BlogPostFrontmatter>();
  //   const { prev, next } = getPrevAndNextPagesByTitle(title, '/learn/tutorials');

  return (
    <BaseBlogPostLayout frontMatter={frontMatter}>
      <>{children}</>
    </BaseBlogPostLayout>
  );
}

export default TutorialLayout;
