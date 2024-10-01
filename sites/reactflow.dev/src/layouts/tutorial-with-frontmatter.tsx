import { ReactNode } from 'react';
import { useConfig } from 'nextra-theme-docs';
import { getPagesUnderRoute } from 'nextra/context';
import { type MdxFile } from 'nextra';
import {
  BlogPostLayout as BaseBlogPostLayout,
  type BlogPostFrontmatter,
} from 'xy-shared';

export type TutorialLayoutProps = {
  children: ReactNode;
};

export function TutorialLayout({ children }: TutorialLayoutProps) {
  const { title, frontMatter } = useConfig<BlogPostFrontmatter>();
  const { prev, next } = getPrevAndNextPagesByTitle(title, '/learn/tutorials');

  return (
    <BaseBlogPostLayout frontMatter={frontMatter}>
      <>{children}</>
    </BaseBlogPostLayout>
  );
}

export default TutorialLayout;

// UTILS -----------------------------------------------------------------------

function getPrevAndNextPagesByTitle(title: string, route: string) {
  const pages = getMdxPagesUnderRoute(route).sort((a, b) => {
    const aDate = new Date(a.frontMatter?.date);
    const bDate = new Date(b.frontMatter?.date);

    return aDate.getTime() - bDate.getTime();
  });

  const currentIndex = pages.findIndex(
    (page) => page.frontMatter?.title === title,
  );

  const prev = pages[currentIndex - 1];
  const next = pages[currentIndex + 1];

  return { prev, next };
}

function getMdxPagesUnderRoute(route: string) {
  return getPagesUnderRoute(route).filter(isMdxPage);
}

function isMdxPage(page: MdxFile | any): page is MdxFile {
  return !!page?.frontMatter;
}
