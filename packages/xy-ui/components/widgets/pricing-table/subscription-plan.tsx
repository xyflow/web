import cn from 'clsx';
import { Button } from '../../../.';
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

function Features({ items }: { items: FeatureConfig[] }) {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={`feat-${i}`} className="mb-2">
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
    (price) => price.currency === currency && price.interval === billingInterval
  );

  if (!currentPrice || !pricing) {
    return null;
  }

  const priceStrikeThrough =
    billingInterval === BillingInterval.YEAR
      ? pricing.find(
          (price) =>
            price.currency === currency && price.interval !== billingInterval
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
  buttonVariant = 'default',
  buttonLabel = 'Sign up',
  isLoading = false,
  onSelect = ({ plan }) => {
    const url =
      plan === PlanId.ENTERPRISE
        ? 'https://xyflow.com/react-flow/pro/enterprise'
        : 'https://pro.xyflow.com';

    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  },
}: PlanProps) {
  return (
    <div
      className={cn(
        'p-8 md:p-12 lg:p-14',
        highlighted &&
          'border-x border-solid border-gray-100 bg-gradient-to-b from-react/5'
      )}
    >
      <div className={cn('font-bold text-4xl', highlighted && 'text-react')}>
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
            variant={highlighted ? 'react' : buttonVariant}
            loading={isLoading}
            onClick={() => onSelect({ plan: id, currency, billingInterval })}
          >
            {buttonLabel}
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
        <Features items={features} />
      </div>
    </div>
  );
}
