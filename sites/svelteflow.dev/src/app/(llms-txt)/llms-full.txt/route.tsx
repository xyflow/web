// ROUTE -----------------------------------------------------------------------

import { buildLLMSTxt } from '../utils';

async function getCachedBody() {
  'use cache';
  return buildLLMSTxt(['learn', 'examples', 'reference']);
}

export async function GET() {
  const body = await getCachedBody();

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
