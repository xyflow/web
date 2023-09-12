'use client';
import { useState } from 'react';
import { Button } from 'xy-ui';
import PricingPlan from './PricingPlan';

const StripePricingTable = () => {
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month');

  return (
    <div>
      <div className="flex justify-center my-4">
        <Button
          className="rounded-r-none border-r-none"
          variant={billingInterval === 'month' ? 'react' : 'outline'}
          onClick={() => setBillingInterval('month')}
        >
          Monthly
        </Button>
        <Button
          className="rounded-l-none border-l-none"
          variant={billingInterval === 'year' ? 'react' : 'outline'}
          onClick={() => setBillingInterval('year')}
        >
          Yearly
        </Button>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <PricingPlan plan="starter" interval={billingInterval} seats={1} />
        <PricingPlan plan="pro" interval={billingInterval} seats={5} />
        <PricingPlan plan="enterprise" interval={billingInterval} seats={10} />
      </div>
    </div>
  );
};

export default StripePricingTable;
