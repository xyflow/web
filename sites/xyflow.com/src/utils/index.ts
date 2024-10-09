import { getPagesUnderRoute } from 'nextra/context';
import { isMdxFile } from 'xy-shared';

import { type Route, type ExternalRoute, type InternalRoute } from './routes';

export function getMdxPagesUnderRoute(route: InternalRoute) {
  return getPagesUnderRoute(route).filter(isMdxFile);
}

// used for pagination for blog and case studies to display prev and next post/ case study
export function getPrevAndNextPagesByTitle(title, route: InternalRoute) {
  const pages = getMdxPagesUnderRoute(route);

  const currentIndex = pages.findIndex(
    (page) => page.frontMatter?.title === title,
  );
  const prevIndex = currentIndex === 0 ? pages.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === pages.length - 1 ? 0 : currentIndex + 1;

  const prevPage = pages[prevIndex];
  const nextPage = pages[nextIndex];

  return [prevPage, nextPage];
}

export type { Route, ExternalRoute, InternalRoute };
