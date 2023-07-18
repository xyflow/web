import { Environment } from '@/types';

export function isProduction() {
  return process.env.NODE_ENV === Environment.PRODUCTION;
}

export function isDevelopment() {
  return process.env.NODE_ENV === Environment.DEVELOPMENT;
}
