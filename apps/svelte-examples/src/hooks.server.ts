import type { Handle } from '@sveltejs/kit';

// TODO: Use environment variables

export const handle: Handle = async ({ resolve, event }) => {
  // Required for CORS to work
  if (event.request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      }
    });
  }

  const response = await resolve(event);
  response.headers.append('Access-Control-Allow-Origin', '*');
  return response;
};
