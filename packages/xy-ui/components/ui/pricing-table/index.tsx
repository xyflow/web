'use client';

import { useState } from 'react';
import {
  cn,
  Button,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Container,
  TooltipProvider,
} from '../../../';

import Plan from './subscription-plan';
import defaultConfig from './default-config';
import { Currency, BillingInterval, SubscriptionPlan, PlanId } from './types';

const PricingTable = ({
  className,
  plans = defaultConfig,
  onSelect,
}: {
  className?: string;
  plans?: SubscriptionPlan[];
  onSelect?: ({
    plan,
    currency,
    billingInterval,
  }: {
    plan: PlanId;
    currency: Currency;
    billingInterval: BillingInterval;
  }) => void;
}) => {
  const [billingInterval, setBillingInterval] = useState<BillingInterval>(
    BillingInterval.MONTH,
  );
  const [currency, setCurrency] = useState<Currency>(getDefaultCurrency());

  const isMonthly = billingInterval === BillingInterval.MONTH;

  return (
    <TooltipProvider delayDuration={0}>
      <div>
        <div
          className={cn(
            'flex flex-wrap justify-between lg:justify-center relative mb-8',
            className,
          )}
        >
          <div className="rounded-full flex gap-1 bg-gray-100 p-2 ">
            <Button
              variant="secondary"
              onClick={() => setBillingInterval(BillingInterval.MONTH)}
              className={
                isMonthly ? '' : 'text-gray-400 bg-gray-100 shadow-none'
              }
            >
              Monthly
            </Button>
            <Button
              variant="secondary"
              onClick={() => setBillingInterval(BillingInterval.YEAR)}
              className={
                !isMonthly ? '' : 'text-gray-400 bg-gray-100 shadow-none'
              }
            >
              Yearly
            </Button>
          </div>
          <Select
            value={currency}
            onValueChange={(value) => setCurrency(value as Currency)}
          >
            <SelectTrigger className="w-[100px] absolute right-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">$ USD</SelectItem>
              <SelectItem value="eur">€ EUR</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Container>
          <div className={`grid grid-cols-1 lg:grid-cols-3 gap-0`}>
            {plans.map((plan) => (
              <Plan
                {...plan}
                currency={currency}
                billingInterval={billingInterval}
                onSelect={onSelect}
                key={plan.id}
              />
            ))}
          </div>
        </Container>
      </div>
    </TooltipProvider>
  );
};

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

PricingTable.displayName = 'PricingTable';

export {
  PricingTable,
  defaultConfig as defaultSubscriptionPlans,
  PlanId as SubscriptionPlanId,
  BillingInterval,
};
