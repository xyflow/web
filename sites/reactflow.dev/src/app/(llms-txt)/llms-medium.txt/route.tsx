// ROUTE -----------------------------------------------------------------------

import { buildLLMSTxt, ALL_SECTIONS } from '../utils';

export const dynamic = 'force-static';

// Exclude the examples section from the full LLMSTxt
const sections = { ...ALL_SECTIONS };
delete sections.examples;

export async function GET() {
  const body = await buildLLMSTxt(sections);

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
