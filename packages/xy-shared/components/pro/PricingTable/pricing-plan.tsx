'use client';

import { useTransition } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { callNhostFunction } from '../../../server-actions/call-nhost-function';
import { redirect } from 'next/navigation';
import { getHostName } from '../../../lib/get-host-name';

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
      const hostName = getHostName();
      const successUrl = `${hostName}/pro/dashboard`;
      const cancelUrl = `${hostName}/pro/subscribe`;

      const response = await callNhostFunction('/stripe/create-checkout', {
        plan,
        interval,
        currency,
        framework: process.env.NEXT_PUBLIC_FRAMEWORK ?? 'react',
        successUrl,
        cancelUrl,
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
