import { useAccessToken, useNhostClient } from '@nhost/nextjs';

export default function useNhostFunction() {
  const nhostClient = useNhostClient();
  const accessToken = useAccessToken();

  return function callNhostFunction<TData = unknown, TBody = unknown, TErrorMessage = unknown>(url: string, body: any) {
    return nhostClient.functions.call<TData, TBody, TErrorMessage>(url, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };
}
