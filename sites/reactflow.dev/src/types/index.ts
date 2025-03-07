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

export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export enum Framework {
  REACT = 'react',
}

export enum Currency {
  USD = 'usd',
  EUR = 'eur',
  INR = 'inr',
}

export type ProExampleVariant = {
  id: string;
  label: string;
};

export type ProExampleConfig = {
  id: string;
  name?: string;
  description?: string;
  framework: string;
  hidden?: boolean;
  variants?: ProExampleVariant[];
  free?: boolean;
  type?: 'template' | 'example';
  previewUrl?: string;
};

export type GithubFile = { name: string; content: string; path: string };
