'use server';

import { getNhost } from '@/utils/nhost';

export async function callNhostFunction(
  url: `/${string}`,
  body: Record<string, unknown>,
) {
  const nhost = await getNhost();
  const accessToken = nhost.auth.getAccessToken();
  const response = await fetch(`${nhost.functions.url}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
    next: {
      revalidate: 0,
    },
  });
  const contentType = response.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    throw new Error(await response.text());
  }
  const data = await response.json();

  if (response.status !== 200) {
    return { ...data, error: true, status: response.status };
  }

  return data;
}
