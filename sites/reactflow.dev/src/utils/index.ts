import { MdxFile } from 'nextra';
import { getPagesUnderRoute } from 'nextra/context';
import { type Route, type ExternalRoute, type InternalRoute } from './routes';

export function isMdxPage(page: MdxFile | any): page is MdxFile {
  return page?.kind === 'MdxPage';
}

export function getMdxPagesUnderRoute(route: InternalRoute) {
  return getPagesUnderRoute(route).filter(isMdxPage);
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

export async function fetchJSON(url: string): Promise<Record<string, any>> {
  let json = {};

  try {
    const resp = await fetch(url, { headers: { 'User-Agent': 'webkid' } });
    json = await resp.json();
  } catch (err) {
    console.log(err);
  }

  return json;
}

export type { Route, ExternalRoute, InternalRoute };
