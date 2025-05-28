import { Currency } from '@/types';

export function getCurrencySign(currency?: Currency) {
  switch (currency) {
    case Currency.EUR:
      return '€';
    case Currency.INR:
      return '₹';
    default:
      return '$';
  }
}
