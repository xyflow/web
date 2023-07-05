'use client';

import * as React from 'react';

import { Card, CardHeader, CardTitle, CardDescription, CardFooter, Button, cn } from 'xy-ui';
import { SubscriptionPlan } from '@/types';
import Link from 'next/link';

import useSubscription from '@/hooks/useSubscription';

type SubscriptionFeatureProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  plans?: SubscriptionPlan[];
};

function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function SubscriptionFeature({ title, description, plans = [] }: SubscriptionFeatureProps) {
  const { plan } = useSubscription();
  const isLocked = plans && plans.length > 0 && !plans.includes(plan);

  return (
    <Card>
      <CardHeader className={cn({ 'bg-muted': isLocked })}>
        <CardTitle className={cn({ 'text-muted-foreground': isLocked })}>{title}</CardTitle>
        {description && <CardDescription className="text-muted-foreground">{description}</CardDescription>}
      </CardHeader>
      <CardFooter className={cn({ 'bg-muted': !isLocked })}>
        {isLocked && (
          <div className="flex flex-wrap items-center space-x-1.5">
            <div className="text-muted-foreground text-sm font-bold">Included in:</div>
            {plans.map((plan) => (
              <div className="text-sm py-0.5 px-2 rounded-full bg-pink-100 border border-react text-react">{plan}</div>
            ))}
          </div>
        )}
        <Link href="/subscribe" className="ml-auto">
          <Button variant="react">Subscribe</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default SubscriptionFeature;
