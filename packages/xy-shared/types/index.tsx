import { HeartIcon } from '@heroicons/react/24/outline';

export type ExampleCode = {
  files: Record<string, string>;
  dependencies: Record<string, string>;
};

export type HeroIcon = typeof HeartIcon;
export type Framework = 'react' | 'svelte';

export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export enum SubscriptionPlan {
  FREE = 'free',
  STARTER = 'starter',
  PRO = 'pro',
  ENTERPRISE = 'enterprise',
  STUDENT = 'student',
  OSS = 'oss',
}

export enum Currency {
  USD = 'usd',
  EUR = 'eur',
  INR = 'inr',
}
