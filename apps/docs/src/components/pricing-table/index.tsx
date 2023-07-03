'use client';

import { useState } from 'react';

import PeriodSwitch from './period-switch';
import CurrencySwitch from './currency-switch';
import Plans from './plans';
import { Currency, BillingPeriod } from './types';

export default function PricingTable() {
  const [period, setPeriod] = useState<BillingPeriod>(BillingPeriod.MONTHLY);
  const [currency, setCurrency] = useState<Currency>(getDefaultCurrency());

  return (
    <div>
      <div className="flex justify-center relative mb-8">
        <PeriodSwitch period={period} onClick={setPeriod} />
        <CurrencySwitch value={currency} onChange={setCurrency} />
      </div>

      <Plans currency={currency} period={period} />

      <div className="my-20">
        <div className="text-center text-light">Some of our subscribers</div>
        <div className="text-center">logo logo logo logo</div>
      </div>
    </div>
  );
}

function getDefaultCurrency(): Currency {
  let isEurope = false;

  try {
    isEurope = Intl.DateTimeFormat()
      .resolvedOptions()
      .timeZone.toLowerCase()
      .includes('europe');
  } catch (err) {
    console.log(err);
  }

  return isEurope ? Currency.EUR : Currency.USD;
}
