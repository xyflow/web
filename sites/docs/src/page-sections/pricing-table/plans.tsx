import Link from 'next/link';
import { Button, Container } from 'xy-ui';

import Plan from './plan';
import planConfig from './plan-config';
import { Currency, BillingPeriod } from './types';

const { starter, pro, enterprise } = planConfig;

export default function Plans({
  currency,
  period,
}: {
  currency: Currency;
  period: BillingPeriod;
}) {
  const isYearly = period === BillingPeriod.YEARLY;

  return (
    <Container>
      <div className="grid grid-cols-3 gap-0">
        <Plan
          name={starter.label}
          description={starter.description}
          price={starter.stripe.prices[currency][period]}
          priceStrikethrough={
            isYearly && starter.stripe.prices[currency].monthly
          }
          features={starter.features}
        />
        <Plan
          name={pro.label}
          description={pro.description}
          price={pro.stripe.prices[currency][period]}
          priceStrikethrough={isYearly && pro.stripe.prices[currency].monthly}
          features={pro.features}
          highlighted
        />
        <Plan
          name={enterprise.label}
          description={enterprise.description}
          features={enterprise.features}
          action={
            <Button asChild variant="secondary" size="lg">
              <Link href="/enterprise">Request a Quote</Link>
            </Button>
          }
        />
      </div>
    </Container>
  );
}
