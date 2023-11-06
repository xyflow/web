import Link from 'next/link';
import cn from 'clsx';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@xyflow/xy-ui';

import {
  BillingInterval,
  Currency,
  SubscriptionPlan,
  FeatureConfig,
  PricingConfig,
  PlanId,
} from './types';

type PlanProps = SubscriptionPlan & {
  currency: Currency;
  billingInterval: BillingInterval;
  onSelect?: ({
    plan,
    currency,
    billingInterval,
  }: {
    plan: PlanId;
    currency: Currency;
    billingInterval: BillingInterval;
  }) => void;
};

function Features({
  items,
  highlighted,
}: {
  items: FeatureConfig[];
  highlighted: boolean;
}) {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={`feat-${i}`} className="mb-2 flex gap-1">
          <CheckCircleIcon
            className={cn('w-[21px] h-[21px] shrink-0 mt-0.5', {
              'text-primary': highlighted,
            })}
          />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

function PricingDisplay({
  pricing,
  currency,
  billingInterval,
}: {
  pricing?: PricingConfig[];
  currency: Currency;
  billingInterval: BillingInterval;
}) {
  const currentPrice = pricing?.find(
    (price) =>
      price.currency === currency && price.interval === billingInterval,
  );

  if (!currentPrice || !pricing) {
    return null;
  }

  const priceStrikeThrough =
    billingInterval === BillingInterval.YEAR
      ? pricing.find(
          (price) =>
            price.currency === currency && price.interval !== billingInterval,
        )
      : undefined;

  return (
    <div className="ml-4 leading-tight">
      <div className="flex">
        {priceStrikeThrough && (
          <div className="mr-2 text-light line-through">
            {priceStrikeThrough.label}
          </div>
        )}
        <div className="font-bold">{currentPrice.label}</div>
      </div>
      <div className="text-light">per month</div>
    </div>
  );
}

export default function Plan({
  id,
  label,
  description,
  highlighted = false,
  features = [],
  pricing,
  currency,
  billingInterval,
  buttonVariant = 'black',
  buttonLabel = 'Sign up',
  isLoading = false,
  onSelect,
}: PlanProps) {
  const btnLink =
    id === PlanId.ENTERPRISE
      ? '/pro/enterprise'
      : 'https://pro.reactflow.dev/signup';

  return (
    <div
      className={cn(
        'p-8 md:p-12 lg:p-14',
        highlighted &&
          'border-x border-solid border-gray-100 bg-gradient-to-b from-primary/5',
      )}
    >
      <div className={cn('font-bold text-4xl', highlighted && 'text-primary')}>
        {label}
      </div>
      <div className="text-lg leading-tight h-[120px] relative mt-6">
        {description}
      </div>

      <div className="mb-8 lg:mb-20">
        <div className="flex">
          <Button
            className="shrink-0"
            size="lg"
            variant={highlighted ? 'default' : buttonVariant}
            loading={isLoading}
            asChild
          >
            {onSelect ? (
              <Button
                onClick={() =>
                  onSelect({ plan: id, currency, billingInterval })
                }
              >
                {buttonLabel}
              </Button>
            ) : (
              <Link href={btnLink}>{buttonLabel}</Link>
            )}
          </Button>

          <PricingDisplay
            pricing={pricing}
            currency={currency}
            billingInterval={billingInterval}
          />
        </div>
      </div>

      <div className="mt-8">
        <div className="text-light mb-4">Included Features</div>
        <Features items={features} highlighted={highlighted} />
      </div>
    </div>
  );
}
