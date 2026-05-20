'use server';

import { callNhostFunction } from './call-nhost-function';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export async function openStripeCustomerPortal() {
  const headersList = await headers();
  const hostName = headersList.get('host');
  const protocol = hostName?.startsWith('localhost') ? 'http' : 'https';
  const returnUrl = `${protocol}://${hostName}/pro/account`;

  const response = await callNhostFunction('/stripe/create-customer-portal', {
    returnUrl,
  });

  if (!response.error && response.url) {
    redirect(response.url);
  }
}
