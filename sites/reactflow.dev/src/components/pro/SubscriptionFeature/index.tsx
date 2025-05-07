'use client';

import * as React from 'react';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  Button,
  cn,
} from '@xyflow/xy-ui';
import { SubscriptionPlan } from '@/types';
import Link from 'next/link';
import { ArrowLongRightIcon } from '@heroicons/react/20/solid';

import useSubscription from '@/hooks/useSubscription';
import CustomerPortalButton from '../CustomerPortalButton';

type SubscriptionFeatureProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  plans?: SubscriptionPlan[];
  button?: { label: string; href?: string; action?: () => unknown };
  requireAdminSubscription?: boolean;
};

function SubscriptionFeature({
  title,
  description,
  plans = [],
  button,
  requireAdminSubscription = false,
}: SubscriptionFeatureProps) {
  const { plan, isAdmin, isTeamSubscribed } = useSubscription();
  const isActive = plans.includes(plan) && (requireAdminSubscription ? isAdmin : true);

  return (
    <Card
      className={cn('flex flex-col order-2 pt-2', {
        'bg-muted': !isActive,
        'order-1': isActive,
      })}
    >
      <CardHeader className={cn({ 'cursor-not-allowed': !isActive })}>
        <CardTitle className={cn({ 'text-muted-foreground': !isActive })}>
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-md pt-2 text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardFooter className={cn('mt-auto bg-white')}>
        {isActive ? (
          <>{button && <ActionButton {...button} />}</>
        ) : isTeamSubscribed ? (
          <div className="text-muted-foreground text-sm">
            Please contact your team admin to upgrade.
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center space-x-1.5">
              <div className="text-muted-foreground text-sm">
                Available on the <span className="font-bold">{plans[0]}</span> plan.
              </div>
            </div>
            {isAdmin ? (
              <div className="ml-auto">
                <CustomerPortalButton
                  className="text-react font-bold text-sm"
                  variant="link"
                >
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

function ActionButton({
  href,
  label,
  action = () => {},
}: NonNullable<SubscriptionFeatureProps['button']>) {
  const children = (
    <>
      {label} <ArrowLongRightIcon className="ml-1 h-4 w-4" />
    </>
  );
  if (href) {
    return (
      <Link href={href}>
        <Button className="text-md font-bold" variant="link">
          {children}
        </Button>
      </Link>
    );
  }

  return (
    <Button onClick={action} className="text-md font-bold" variant="link">
      {children}
    </Button>
  );
}

export default SubscriptionFeature;
