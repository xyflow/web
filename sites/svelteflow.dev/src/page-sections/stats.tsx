import { type ReactNode } from 'react';
import cn from 'clsx';
import Link from 'next/link';

import { Button, Text, Heading } from 'xy-ui';
import { Framework } from '@/types';

type Stats = {
  label: ReactNode;
  value: ReactNode;
};

export function StatsDisplay({
  value,
  label,
  variant,
  className,
}: Stats & { variant: Framework | 'xyflow'; className?: string }) {
  return (
    <div className={cn('text-center', className)}>
      <Heading className={cn('font-bold whitespace-nowrap', `text-${variant}`)}>
        {value}
      </Heading>
      <Text className="whitespace-nowrap" size="lg">
        {label}
      </Text>
    </div>
  );
}

export default function Stats({
  stats,
  description,
  variant,
  link,
  linkLabel,
  className,
}: {
  stats: Stats[];
  description: string;
  variant: Framework | 'xyflow';
  link?: string;
  linkLabel?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('lg:grid lg:grid-cols-7 lg:gap-20', className)}>
      <div className="lg:col-span-4 flex place-content-between lg:space-x-24 grow">
        {stats.map((s) => (
          <StatsDisplay
            key={`${s.label}-${s.value}`}
            variant={variant}
            {...s}
          />
        ))}
      </div>
      <div className="lg:col-span-3 mt-8 lg:mt-0">
        <Text variant="light">{description}</Text>
        {link && (
          <Button asChild variant={`${variant}-pro`} className="mt-4">
            <Link href={link}>{linkLabel}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
