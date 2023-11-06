'use client';

import { useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@xyflow/xy-ui';

import useNhostFunction from '@/hooks/useNhostFunction';

type PricingPlanProps = {
  plan: 'starter' | 'pro' | 'enterprise';
  interval?: 'month' | 'year';
  currency?: 'usd' | 'eur';
  seats?: number;
};

export default function PricingPlan({ plan, interval = 'month', currency = 'usd', seats = 0 }: PricingPlanProps) {
  const callNhostFunction = useNhostFunction();
  const [isLoading, setLoading] = useState(false);

  const subscribe = async () => {
    setLoading(true);

    const response = await callNhostFunction<{ url: string }>('/stripe/create-checkout', {
      plan,
      interval,
      currency,
    });

    if (response.res?.data?.url) {
      window.location.href = response.res.data.url;
      setTimeout(() => setLoading(false), 500);
      return;
    }

    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{plan}</CardTitle>
        <div>$129</div>
      </CardHeader>
      <CardContent>
        <div>
          <ul>
            <li>Access to Pro Examples</li>
            <li>
              Invite {seats} team member{seats > 1 ? 's' : ''}
            </li>
            <li>Support the development</li>
          </ul>
        </div>
      </CardContent>
      <CardContent>
        <Button loading={isLoading} className="w-full" variant="react" onClick={subscribe}>
          Subscribe
        </Button>
      </CardContent>
    </Card>
  );
}
