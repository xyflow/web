import { getPageMap } from 'nextra/page-map';
import { getExamplesPageMap } from 'xy-shared/server/example-utils';
import { collectMarkdownLinks } from 'xy-shared/server/llms-txt';

// HANDLERS --------------------------------------------------------------------

export const dynamic = 'force-static';

/** The `/llms.txt` file is a proposed standard to help LLMs navigate sites and
 * find content at inference time. You can think of it like a sitemap, but for
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

${collectMarkdownLinks('react', learn).trim()}

## Examples

${collectMarkdownLinks('react', examples).trim()}

## API reference

${collectMarkdownLinks('react', reference).trim()}
`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
