import type { Handle } from '@sveltejs/kit';

// TODO: Use environment variables
const DOCS_PAGE_URL = 'https://xyflow-docs-git-staging-xyflow.vercel.app';

export const handle: Handle = async ({ resolve, event }) => {
  // Required for CORS to work
  if (event.request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Origin': DOCS_PAGE_URL,
        'Access-Control-Allow-Headers': '*'
      }
    });
  }

  const response = await resolve(event);
  response.headers.append('Access-Control-Allow-Origin', DOCS_PAGE_URL);
  return response;
};
