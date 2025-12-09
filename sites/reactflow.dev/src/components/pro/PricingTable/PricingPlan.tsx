'use client';

import { useTransition } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle } from 'xy-shared';
import { callNhostFunction } from '@/server-actions';
import { redirect } from 'next/navigation';

type PricingPlanProps = {
  plan: 'starter' | 'pro' | 'enterprise';
  interval?: 'month' | 'year';
  currency?: 'usd' | 'eur';
  seats?: number;
};

export default function PricingPlan({
  plan,
  interval = 'month',
  currency = 'usd',
  seats = 0,
}: PricingPlanProps) {
  const [isLoading, startTransition] = useTransition();

  const subscribe = () => {
    startTransition(async () => {
      const response = await callNhostFunction('/stripe/create-checkout', {
        plan,
        interval,
        currency,
      });

      if (response.url) {
        redirect(response.res.data.url);
      }
    });
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
        <Button loading={isLoading} className="w-full" onClick={subscribe}>
          Subscribe
        </Button>
      </CardContent>
    </Card>
  );
}
