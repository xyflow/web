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
