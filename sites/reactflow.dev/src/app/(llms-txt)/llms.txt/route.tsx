import { getPageMap } from 'nextra/page-map';
import { getPageMap as getExamplesPageMap } from '../../(content-pages)/examples/[...slug]/utils';
import { isFolder, isMdxFile, TitledPageMapItem } from '../utils';

// HANDLERS --------------------------------------------------------------------

export const dynamic = 'force-static';

/** The `/llms.txt` file is a proposed standard to help LLMs navigate sites and
 * find content at inference time. You can think of it like a sitemap for but
 * AI instead of people.
 *
 * Next doesn't have any built-in mechanism for generating these like it does for
 * sitemaps or robots.txt, so here we have a static GET route at `/llms.txt` that
 * builds it for us.
 *
 * The format is standardised and documented here: https://llmstxt.org. It's little
 * more than a markdown doc of links.
 */
export async function GET() {
  const learn = await getPageMap('/learn');
  const { children: examples } = await getExamplesPageMap();
  const reference = await getPageMap('/api-reference');

  const body = `# React Flow documentation

> React Flow is a library for building interactive, node-based user interfaces such as flowcharts, diagrams, visual programming tools, and workflows. It supports theming, custom nodes and edges, and a library of shadcn UI components.

## Guides

${collectLinks(learn).trim()}

## Examples

${collectLinks(examples).trim()}

## API reference

${collectLinks(reference).trim()}
`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}

// UTILS -----------------------------------------------------------------------

/** Builds a tree of markdown links from the page map nextra gives us */
const collectLinks = (items: TitledPageMapItem[], indent = 0): string => {
  // The page map will contain separate file and folder entries in cases where
  // a route is both an actual page and a parent to other pages. To avoid duplicating
  // entries we keep track of the routes we've already seen at this level. It
  // *seems* deterministic that the mdx file appears in the list before the folder,
  // but it remains to be seen if we can rely on that... probably fine! 😇
  const seen = new Set();

  let output = '';

  for (const item of items) {
    if (isMdxFile(item) && !seen.has(item.route)) {
      const { name, route, title, frontMatter = {} } = item;
      const { description } = frontMatter;

      seen.add(route);
      output += `${' '.repeat(indent)}- [${title ?? name}](https://reactflow.dev${route})${description ? `: ${description}` : ''}\n`;
    }

    if (isFolder(item)) {
      const { title, route, children } = item;

      if (title && !seen.has(route)) {
        output += `${' '.repeat(indent)}- ${title}\n`;
      }

      seen.add(route);
      output += collectLinks(children, indent + 2);
    }
  }

  return output;
};

Atlas2018;
