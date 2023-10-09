import { getPagesUnderRoute } from 'nextra/context';
import { type MdxFile } from 'nextra';
import { useConfig } from 'nextra-theme-docs';

export function usePostMetadata() {
  const { title, frontMatter } = useConfig();
  const { prev, next } = getPrevAndNextPagesByTitle(title, '/blog');

  return { frontMatter, prev, next };
}

// UTILS -----------------------------------------------------------------------

function getPrevAndNextPagesByTitle(title: string, route: string) {
  const pages = getMdxPagesUnderRoute(route).sort((a, b) => {
    const aDate = new Date(a.frontMatter?.date);
    const bDate = new Date(b.frontMatter?.date);

    return aDate.getTime() - bDate.getTime();
  });

  const currentIndex = pages.findIndex(
    (page) => page.frontMatter?.title === title
  );

  const prev = pages[currentIndex - 1];
  const next = pages[currentIndex + 1];

  return { prev, next };
}

function getMdxPagesUnderRoute(route: string) {
  return getPagesUnderRoute(route).filter(isMdxPage);
}

function isMdxPage(page: MdxFile | any): page is MdxFile {
  return page?.kind === 'MdxPage';
}
