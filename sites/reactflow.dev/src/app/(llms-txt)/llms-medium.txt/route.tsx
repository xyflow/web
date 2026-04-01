// ROUTE -----------------------------------------------------------------------

import { buildLLMSTxt } from '../utils';

export const dynamic = 'force-static';

export async function GET() {
  const body = await buildLLMSTxt(['learn', 'ui']);

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
