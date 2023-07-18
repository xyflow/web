import { useAccessToken, useNhostClient } from '@nhost/nextjs';

export default function useNhostFunction() {
  const nhostClient = useNhostClient();
  const accessToken = useAccessToken();

  return (url: string, body: any) => {
    return nhostClient.functions.call(url, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };
}
