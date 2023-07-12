export enum PlanId {
  STARTER = 'starter',
  PRO = 'pro',
  ENTERPRISE = 'enterprise',
}

export enum Currency {
  EUR = 'eur',
  USD = 'usd',
}

export enum BillingPeriod {
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export type PricingPlanFeature = {
  label: React.ReactNode;
  description: React.ReactNode;
  button: {
    label: string;
    href: string;
    external?: boolean;
  };
};

export type PriceConfig = {
  label: string;
  unit: string;
} & Record<Environment, string>;

export type SubscriptionConfig = Record<BillingPeriod, PriceConfig>;

export type StripeConfig = {
  product: Record<Environment, string>;
  prices: Record<Currency, SubscriptionConfig>;
};

export type PricingPlan = {
  id: string;
  label: string;
  description: string;
  features: PricingPlanFeature[];
  stripe?: StripeConfig;
};
