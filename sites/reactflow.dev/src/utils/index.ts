import { MdxFile } from 'nextra';
import { getAllPages, getPagesUnderRoute } from 'nextra/context';
import { type Route, type ExternalRoute, type InternalRoute } from './routes';
import { useConfig } from 'nextra-theme-docs';

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

// Collect all frontmatters for fast access so we can display pills in the sidebar
// more efficiently
let pageFrontMattersMap: Map<string, any> = undefined;
const RELEVANT_FRONTMATTER_KEYS = ['is_pro_example'];

function addToMap(
  map: Map<string, any>,
  elements: ReturnType<typeof getAllPages>,
) {
  elements.forEach((element) => {
    if (element.kind === 'MdxPage' && element.frontMatter) {
      for (const key of RELEVANT_FRONTMATTER_KEYS) {
        if (element.frontMatter[key]) {
          map.set(element.route, element.frontMatter);
          break;
        }
      }
    }
    if (element.kind === 'Folder') {
      addToMap(map, element.children);
    }
  });
}

function initializePageFrontMattersMap() {
  const allPages = getAllPages();
  pageFrontMattersMap = new Map();
  addToMap(pageFrontMattersMap, allPages);
}

function getFrontmatterOfPage(route: string) {
  if (!pageFrontMattersMap) {
    initializePageFrontMattersMap();
  }

  const frontMatter = pageFrontMattersMap.get(route);
  return frontMatter;
}

// this function looks up the frontmatter data of an example and returns true if it is a pro example
// needs to be done this way because nextra doesn't pass this information to the sidebar title
// note: this only looks up one nesting level
export function isProExample(route: string) {
  if (!route.startsWith('/examples/')) {
    return false;
  }

  const frontMatter = getFrontmatterOfPage(route);

  if (!frontMatter) {
    return false;
  }

  return !!frontMatter.is_pro_example;
}

export function getSidebarTag(route: string) {
  const frontMatter = getFrontmatterOfPage(route);

  if (!frontMatter) {
    return false;
  }

  // console.log(frontMatter);
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
