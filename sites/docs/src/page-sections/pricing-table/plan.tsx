import cn from 'clsx';
import { Button } from 'xy-ui';
import { PricingPlanFeature, PriceConfig } from './types';

type PlanProps = {
  name: string;
  description: string;
  features?: PricingPlanFeature[];
  action?: React.ReactNode;
  price?: PriceConfig;
  priceStrikethrough?: PriceConfig;
  highlighted?: boolean;
};

function PlanAction({
  price,
  priceStrikethrough,
  highlighted,
}: {
  price: PriceConfig;
  priceStrikethrough?: PriceConfig;
  highlighted?: boolean;
}) {
  return (
    <div className="flex">
      <Button
        className="shrink-0"
        size="lg"
        variant={highlighted ? 'react' : 'default'}
      >
        Sign up
      </Button>

      <div className="ml-4 leading-tight">
        <div className="flex">
          {priceStrikethrough && (
            <div className="mr-2 text-light line-through">
              {priceStrikethrough.label}
            </div>
          )}
          <div className="font-bold">{price.label}</div>
        </div>
        <div className="text-light">per {price.unit}</div>
      </div>
    </div>
  );
}

function Features({ items }: { items: PricingPlanFeature[] }) {
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

export default function Plan({
  name,
  description,
  price,
  priceStrikethrough,
  highlighted,
  features,
  action,
}: PlanProps) {
  return (
    <div
      className={cn(
        'p-14',
        highlighted &&
          'border-x border-solid border-gray-100 bg-gradient-to-b from-react/5'
      )}
    >
      <div className={cn('font-bold text-4xl', highlighted && 'text-react')}>
        {name}
      </div>
      <div className="text-lg leading-tight h-[120px] relative mt-6">
        {description}
      </div>

      <div className="mb-20">
        {action ? (
          action
        ) : (
          <PlanAction
            price={price}
            priceStrikethrough={priceStrikethrough}
            highlighted={highlighted}
          />
        )}
      </div>

      <div className="mt-8">
        <div className="text-light mb-4">Included Features</div>
        <Features items={features} />
      </div>
    </div>
  );
}
