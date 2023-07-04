import { Currency, Environment } from 'config/plans';

export function isProduction() {
  return process.env.NODE_ENV === Environment.PRODUCTION;
}

export function isDevelopment() {
  return process.env.NODE_ENV === Environment.DEVELOPMENT;
}

export function getDefaultCurrency(): Currency {
  let isEurope = false;

  try {
    isEurope = Intl.DateTimeFormat().resolvedOptions().timeZone.toLowerCase().includes('europe');
  } catch (err) {
    console.log(err);
  }

  return isEurope ? Currency.EUR : Currency.USD;
}
