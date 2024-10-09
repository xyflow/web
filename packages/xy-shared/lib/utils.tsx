import { ReactNode } from 'react';
import { Folder, MdxFile, Page } from 'nextra';
import { getAllPages } from 'nextra/context';

import { SidebarTitle } from '../components/sidebar-title';

// Well this is a pretty funky class, huh. I'm gonna try and break it down a bit
// so we can understand what's going on here:
//
// sm:
//  This is a tailwind breakpoint. It means the class will only apply on screens
//  that are at least 640px wide.
//
// -mx
//  This utility sets a *negative* margin, and its ultimately how we get our
//  content to be wider than its container.
//
// calc((100vw-768px)/2)
//  768px is the max width of our content container. 100vh is the full width of
//  the viewport. So this expression calculates how much space is left on the
//  screen for us to fill. We divide it by two because we're applying this margin
//  equally on both sides of the embed.
//
// min(...,12rem)
//  As the display gets wider, we want to limit the width of our embeds to do
//  something sensible so they don't end up spanning the entire width of someone's
//  ultrawide monitor. 12rem was chosen as an arbitrary sensible limit, it corresponds
//  to tailwind's `mx-44` utility.
//
export const wideNegativeMargin = 'sm:-mx-[min(calc((100vw-768px)/2),12rem)]';

// Collect all frontmatters for fast access so we can display pills
// in the sidebar more efficiently
// Add all keys you want to check for here
const RELEVANT_FRONTMATTER_KEYS = ['is_pro_example', 'is_free', 'created_at'];
let pageFrontMattersMap: Map<string, any> | undefined = undefined;

export function isMdxFile(element: Page): element is MdxFile {
  return 'frontMatter' in element;
}

export function isFolder(element: Page): element is Folder {
  return 'children' in element;
}

function addToMap(
  map: Map<string, any>,
  elements: ReturnType<typeof getAllPages>,
) {
  elements.forEach((element) => {
    if (isMdxFile(element)) {
      for (const key of RELEVANT_FRONTMATTER_KEYS) {
        if (element.frontMatter?.[key]) {
          map.set(element.route, element.frontMatter);
          break;
        }
      }
    }

    if (isFolder(element)) {
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

  const frontMatter = pageFrontMattersMap!.get(route);
  return frontMatter;
}

export function getFrontmatterTag(route: string, tag: string) {
  const frontMatter = getFrontmatterOfPage(route);

  if (!frontMatter) {
    return undefined;
  }

  return frontMatter[tag];
}

// this helper function is used to generate the _meta.tsx config structure
// for the sidebar
export function getMetaConfigFromTitleLookup(
  titleLookup: Record<string, string | { title: string }>,
  reoutePrefix: string = '',
) {
  return Object.keys(titleLookup).reduce<Record<string, { title: ReactNode }>>(
    (acc, key) => {
      const current = titleLookup[key];
      const title = typeof current === 'string' ? current : current.title;

      acc[key] = {
        title: <SidebarTitle title={title} route={`${reoutePrefix}/${key}`} />,
      };

      return acc;
    },
    {},
  );
}
