import { ButtonProps } from '../button';

export enum PlanId {
  STARTER = 'starter',
  PRO = 'pro',
  ENTERPRISE = 'enterprise',
}

export enum Currency {
  EUR = 'eur',
  USD = 'usd',
  INR = 'inr',
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
  buttonLabelSignedId?: string;
  isLoading?: boolean;
};
export type OnSelectCurrenty = ({
  plan,
  currency,
  billingInterval,
}: {
  plan: PlanId;
  currency?: Currency;
  billingInterval: BillingInterval;
}) => void;
