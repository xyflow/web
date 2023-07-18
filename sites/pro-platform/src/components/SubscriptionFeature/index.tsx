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
};

function SubscriptionFeature({ title, description, plans = [], button }: SubscriptionFeatureProps) {
  const { plan, isSubscribed } = useSubscription();
  const isLocked = plans && plans.length > 0 && !plans.includes(plan);

  return (
    <Card>
      <CardHeader className={cn({ 'bg-muted': isLocked, 'cursor-not-allowed': isLocked })}>
        <CardTitle className={cn({ 'text-muted-foreground': isLocked })}>{title}</CardTitle>
        {description && <CardDescription className="text-muted-foreground">{description}</CardDescription>}
      </CardHeader>
      <CardFooter className={cn({ 'bg-muted': !isLocked })}>
        {isLocked ? (
          <>
            <div className="flex flex-wrap items-center space-x-1.5">
              <div className="text-muted-foreground text-sm font-bold">Upgrade to</div>
              {plans.map((plan) => (
                <div className="text-sm py-0.5 px-2 rounded-full bg-pink-100 border border-react text-react">
                  {plan}
                </div>
              ))}
            </div>
            {isSubscribed ? (
              <div className="ml-auto">
                <CustomerPortalButton variant="outline">Upgrade Subscription</CustomerPortalButton>
              </div>
            ) : (
              <Link href="/subscribe" className="ml-auto">
                <Button variant="outline">Subscribe</Button>
              </Link>
            )}
          </>
        ) : (
          <>
            <div className="flex items-center space-x-2">
              <CheckCircleIcon className="w-6 h-6 text-react" />
              <div className="text-muted-foreground text-sm font-bold">Included</div>
            </div>
            {button && (
              <Link href={button.href} className="ml-auto">
                <Button variant="react">{button.label}</Button>
              </Link>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}

export default SubscriptionFeature;
