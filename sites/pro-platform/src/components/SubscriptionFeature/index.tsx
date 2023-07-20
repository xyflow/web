'use client';

import * as React from 'react';

import { Card, CardHeader, CardTitle, CardDescription, CardFooter, Button, cn } from 'xy-ui';
import { SubscriptionPlan } from '@/types';
import Link from 'next/link';

import useSubscription from '@/hooks/useSubscription';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import CustomerPortalButton from '../CustomerPortalButton';

type SubscriptionFeatureProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  plans?: SubscriptionPlan[];
  button?: { label: string; href: string };
  requireUserSubscription?: boolean;
};

function SubscriptionFeature({
  title,
  description,
  plans = [],
  button,
  requireUserSubscription = false,
}: SubscriptionFeatureProps) {
  const { plan, isUserSubscribed } = useSubscription();
  const isActive = plans.includes(plan) && (requireUserSubscription ? isUserSubscribed : true);

  return (
    <Card className={cn('flex flex-col', { 'border-react': isActive, 'bg-muted': !isActive })}>
      <CardHeader className={cn({ 'cursor-not-allowed': !isActive })}>
        <CardTitle className={cn({ 'text-muted-foreground': !isActive })}>{title}</CardTitle>
        {description && <CardDescription className="text-muted-foreground">{description}</CardDescription>}
      </CardHeader>
      <CardFooter className={cn('mt-auto bg-white', { 'bg-pink-50 border-t border-react': isActive })}>
        {isActive ? (
          <>
            {button && (
              <Link href={button.href}>
                <Button variant="react">{button.label}</Button>
              </Link>
            )}
          </>
        ) : (
          <>
            <div className="flex flex-wrap items-center space-x-1.5">
              <div className="text-muted-foreground text-sm font-bold">Upgrade to</div>
              {plans.map((plan) => (
                <div className="text-sm py-0.5 px-2 rounded-full bg-pink-100 border border-react text-react">
                  {plan}
                </div>
              ))}
            </div>
            {isUserSubscribed ? (
              <div className="ml-auto">
                <CustomerPortalButton variant="outline">Upgrade Subscription</CustomerPortalButton>
              </div>
            ) : (
              <Link href="/subscribe" className="ml-auto">
                <Button variant="outline">Subscribe</Button>
              </Link>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}

export default SubscriptionFeature;
