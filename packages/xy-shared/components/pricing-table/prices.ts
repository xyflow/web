import { BillingInterval, Currency } from './types';

export const prices = {
  starter: [
    {
      currency: Currency.EUR,
      interval: BillingInterval.MONTH,
      label: '149€',
    },
    {
      currency: Currency.EUR,
      interval: BillingInterval.YEAR,
      label: '129€',
    },
    {
      currency: Currency.USD,
      interval: BillingInterval.MONTH,
      label: '$169',
    },
    {
      currency: Currency.USD,
      interval: BillingInterval.YEAR,
      label: '$149',
    },
    {
      currency: Currency.INR,
      interval: BillingInterval.MONTH,
      label: '₹7,500',
    },
    {
      currency: Currency.INR,
      interval: BillingInterval.YEAR,
      label: '₹7,000',
    },
  ],

  pro: [
    {
      currency: Currency.EUR,
      interval: BillingInterval.MONTH,
      label: '269€',
    },
    {
      currency: Currency.EUR,
      interval: BillingInterval.YEAR,
      label: '249€',
    },
    {
      currency: Currency.USD,
      interval: BillingInterval.MONTH,
      label: '$289',
    },
    {
      currency: Currency.USD,
      interval: BillingInterval.YEAR,
      label: '$269',
    },
    {
      currency: Currency.INR,
      interval: BillingInterval.MONTH,
      label: '₹24,000',
    },
    {
      currency: Currency.INR,
      interval: BillingInterval.YEAR,
      label: '₹22,000',
    },
  ],
};
