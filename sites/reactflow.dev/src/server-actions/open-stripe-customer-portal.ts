'use server';

import { callNhostFunction } from './call-nhost-function';
import { redirect } from 'next/navigation';

export async function openStripeCustomerPortal() {
  const response = await callNhostFunction('/stripe/create-customer-portal', {});

  if (!response.error && response.url) {
    redirect(response.url);
  }
}
