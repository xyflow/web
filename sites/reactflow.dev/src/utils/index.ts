import { MdxFile } from 'nextra';
import { getPagesUnderRoute } from 'nextra/context';

export function isMdxPage(page: MdxFile | any): page is MdxFile {
  return page?.kind === 'MdxPage';
}

export function getMdxPagesUnderRoute(route: string) {
  return getPagesUnderRoute(route).filter(isMdxPage);
}

// used for pagination for blog and case studies to display prev and next post/ case study
export function getPrevAndNextPagesByTitle(title, route: string) {
  const pages = getMdxPagesUnderRoute(route);

  const currentIndex = pages.findIndex(
    (page) => page.frontMatter?.title === title
  );
  const prevIndex = currentIndex === 0 ? pages.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === pages.length - 1 ? 0 : currentIndex + 1;

  const prevPage = pages[prevIndex];
  const nextPage = pages[nextIndex];

  return [prevPage, nextPage];
}

export function isDevelopment() {
  return (
    typeof process !== 'undefined' && process.env.NODE_ENV === 'development'
  );
}
