'use client';

import { useState, useMemo, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../ui/select';
import { Container } from '../ui/container';
import { TooltipProvider } from '../ui/tooltip';

import Plan from './subscription-plan';
import defaultConfig from './default-config';
import svelteConfig from './svelte-config';
import {
  Currency,
  BillingInterval,
  SubscriptionPlan,
  PlanId,
  OnSelectCurrenty,
} from './types';
import { useSubscription } from '../../hooks/use-subscription';

const PricingTable = ({
  className,
  library = 'react',
  plans,
  onSelect,
}: {
  className?: string;
  library?: 'react' | 'svelte';
  plans?: SubscriptionPlan[];
  onSelect?: OnSelectCurrenty;
}) => {
  const { user } = useSubscription();
  const isSignedIn = !!user;
  // Use library-specific config if plans not provided
  const selectedPlans = plans ?? (library === 'svelte' ? svelteConfig : defaultConfig);
  const [billingInterval, setBillingInterval] = useState<BillingInterval>(
    BillingInterval.MONTH,
  );

  const initialCurrency = useMemo(() => {
    if (typeof window !== 'undefined') {
      const storedCurrency = localStorage.getItem('pricing-currency');
      if (
        storedCurrency &&
        Object.values(Currency).includes(storedCurrency as Currency)
      ) {
        return storedCurrency as Currency;
      }
    }
    return getDefaultCurrency();
  }, []);
  const [currency, setCurrency] = useState<Currency>(initialCurrency);

  useEffect(() => {
    localStorage.setItem('pricing-currency', currency);
  }, [currency]);

  const isMonthly = billingInterval === BillingInterval.MONTH;
  return (
    <TooltipProvider delayDuration={0}>
      <div>
        <div
          className={cn(
            'relative mb-8 flex flex-wrap justify-between lg:justify-center',
            className,
          )}
        >
          <div className="bg-card flex gap-1 rounded-full p-2">
            <Button
              variant="secondary"
              onClick={() => setBillingInterval(BillingInterval.MONTH)}
              className={isMonthly ? '' : 'bg-card text-gray-400 shadow-none'}
            >
              Monthly
            </Button>
            <Button
              variant="secondary"
              onClick={() => setBillingInterval(BillingInterval.YEAR)}
              className={!isMonthly ? '' : 'bg-card text-gray-400 shadow-none'}
            >
              Yearly
            </Button>
          </div>
          <Select
            value={currency}
            onValueChange={(value) => {
              setCurrency(value as Currency);
              localStorage.setItem('pricing-currency', value);
            }}
          >
            <SelectTrigger className="absolute right-0 w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">$ USD</SelectItem>
              <SelectItem value="eur">€ EUR</SelectItem>
              <SelectItem style={{ display: 'none' }} value="inr">
                ₹ INR
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Container className="z-1 relative">
          <div className={`grid grid-cols-1 gap-0 lg:grid-cols-3`}>
            {selectedPlans.map((plan) => (
              <Plan
                {...plan}
                buttonLabel={isSignedIn ? plan.buttonLabelSignedId : plan.buttonLabel}
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

const currencyConfigs = [
  {
    currency: Currency.EUR,
    search: ['europe'],
  },
  {
    currency: Currency.INR,
    search: ['kolkata', 'calcutta'],
  },
];

function getDefaultCurrency(): Currency {
  let currency = Currency.USD;

  currencyConfigs.forEach((config) => {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone.toLowerCase();

      config.search.forEach((search) => {
        if (timezone.includes(search)) {
          currency = config.currency;
        }
      });
    } catch (err) {
      console.log(err);
    }
  });

  return currency;
}

PricingTable.displayName = 'PricingTable';

export {
  PricingTable,
  defaultConfig as defaultSubscriptionPlans,
  PlanId as SubscriptionPlanId,
  BillingInterval,
};
