import { ButtonProps } from '../../../';

export enum PlanId {
  STARTER = 'starter',
  PRO = 'pro',
  ENTERPRISE = 'enterprise',
}

export enum Currency {
  EUR = 'eur',
  USD = 'usd',
}

export enum BillingInterval {
  MONTH = 'month',
  YEAR = 'year',
}

export type FeatureConfig = {
  label: React.ReactNode;
  description?: React.ReactNode;
};

export type PricingConfig = {
  currency: Currency;
  interval: BillingInterval;
  label: string;
};

export type SubscriptionPlan = {
  id: PlanId;
  label: string;
  description: string;
  features: FeatureConfig[];
  pricing?: PricingConfig[];
  highlighted?: boolean;
  buttonVariant?: ButtonProps['variant'];
  buttonLabel?: string;
  isLoading?: boolean;
};
