import { useConfig } from 'nextra-theme-docs';
import { getPagesUnderRoute } from 'nextra/context';
import { type MdxFile } from 'nextra';
import {
  CaseStudyLayout as BaseCaseStudyLayout,
  type CaseStudyFrontmatter,
} from 'xy-ui';

export type CaseStudyLayoutProps = {
  children: React.ReactNode;
};

export function CaseStudyLayout({ children }: CaseStudyLayoutProps) {
  const { title, frontMatter } = useConfig<CaseStudyFrontmatter>();
  const { prev, next } = getPrevAndNextPagesByTitle(title, '/pro/case-studies');

  return (
    <BaseCaseStudyLayout frontMatter={frontMatter} prev={prev} next={next}>
      {children}
    </BaseCaseStudyLayout>
  );
}

export default CaseStudyLayout;

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
  const prevIndex = currentIndex - 1 < 0 ? pages.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex + 1 > pages.length - 1 ? 0 : currentIndex + 1;

  const prev = pages[prevIndex];
  const next = pages[nextIndex];

  return { prev, next };
}

function getMdxPagesUnderRoute(route: string) {
  return getPagesUnderRoute(route).filter(isMdxPage);
}

function isMdxPage(page: MdxFile | any): page is MdxFile {
  return page?.kind === 'MdxPage';
}
