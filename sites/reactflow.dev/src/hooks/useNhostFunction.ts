import { useCallback } from 'react';
import { useAccessToken, useNhostClient } from '@nhost/react';

export default function useNhostFunction() {
  const nhostClient = useNhostClient();
  const accessToken = useAccessToken();

  const callNhostFunction = useCallback(
    async (url: string, body: Record<string, any>) => {
      const response = await fetch(`${nhostClient.functions.url}${url}`, {
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

      const data = await response.json();

      if (response.status !== 200) {
        return { ...data, error: true, status: response.status };
      }

      return data;
    },
    [accessToken, nhostClient.functions.url],
  );

  return callNhostFunction;
}
