import { type ReactNode } from 'react';
import Link from 'next/link';

import { Button, Text, Heading, cn } from '../../.';

type StatsItem = {
  label: ReactNode;
  value: ReactNode;
};

type StatsDisplayProps = StatsItem & { className?: string };
type StatsProps = {
  stats: StatsItem[];
  description: string;
  link?: string;
  linkLabel?: ReactNode;
  className?: string;
};

function StatsDisplay({ value, label, className }: StatsDisplayProps) {
  return (
    <div className={cn('text-center', className)}>
      <Heading className={cn('font-bold whitespace-nowrap text-primary')}>
        {value}
      </Heading>
      <Text className="whitespace-nowrap mt-2" size="lg">
        {label}
      </Text>
    </div>
  );
}

function Stats({ stats, description, link, linkLabel, className }: StatsProps) {
  return (
    <div className={cn('lg:grid lg:grid-cols-7 lg:gap-20', className)}>
      <div className="lg:col-span-4 flex place-content-between lg:space-x-24 grow">
        {stats.map((s) => (
          <StatsDisplay key={`${s.label}-${s.value}`} {...s} />
        ))}
      </div>
      <div className="lg:col-span-3 mt-8 lg:mt-0">
        <Text variant="light">{description}</Text>
        {link && (
          <Button asChild variant="pro" className="mt-4">
            <Link href={link}>{linkLabel}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export { Stats, StatsDisplay, type StatsProps, type StatsDisplayProps };
