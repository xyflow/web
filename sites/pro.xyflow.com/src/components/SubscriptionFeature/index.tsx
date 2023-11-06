'use client';

import * as React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, Button, cn } from '@xyflow/xy-ui';
import { ArrowLongRightIcon } from '@heroicons/react/20/solid';

import { SubscriptionPlan } from '@/types';
import useSubscription from '@/hooks/useSubscription';
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
    <Card className={cn('flex flex-col', { 'bg-muted': !isActive })}>
      <CardHeader className={cn({ 'cursor-not-allowed': !isActive })}>
        <CardTitle className={cn({ 'text-muted-foreground': !isActive })}>{title}</CardTitle>
        {description && <CardDescription className="text-muted-foreground">{description}</CardDescription>}
      </CardHeader>
      <CardFooter className={cn('mt-auto bg-white')}>
        {isActive ? (
          <>
            {button && (
              <Link href={button.href}>
                <Button variant="react">
                  {button.label} <ArrowLongRightIcon className="ml-1 h-6 w-6" />
                </Button>
              </Link>
            )}
          </>
        ) : (
          <>
            <div className="flex flex-wrap items-center space-x-1.5">
              <div className="text-muted-foreground text-sm">
                Available on the <span className="font-bold">{plans[0]}</span> plan.
              </div>
            </div>
            {isUserSubscribed ? (
              <div className="ml-auto">
                <CustomerPortalButton className="text-react font-bold text-sm" variant="link">
                  Upgrade
                </CustomerPortalButton>
              </div>
            ) : (
              <div className="ml-auto">
                <Button asChild className="text-react font-bold text-sm" variant="link">
                  <Link href="/subscribe">Subscribe</Link>
                </Button>
              </div>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}

export default SubscriptionFeature;
