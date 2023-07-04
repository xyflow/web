import { Button } from 'xy-ui';

import { BillingPeriod } from './types';

export default function PeriodSwitch({
  period,
  onClick,
}: {
  period: BillingPeriod;
  onClick: (val: BillingPeriod) => void;
}) {
  const isMonthy = period === BillingPeriod.MONTHLY;

  return (
    <div>
      <Button
        variant={isMonthy ? 'react' : 'secondary'}
        onClick={() => onClick(BillingPeriod.MONTHLY)}
        className="rounded-r-none"
      >
        Monthly
      </Button>
      <Button
        variant={!isMonthy ? 'react' : 'secondary'}
        onClick={() => onClick(BillingPeriod.YEARLY)}
        className="rounded-l-none"
      >
        Yearly
      </Button>
    </div>
  );
}
