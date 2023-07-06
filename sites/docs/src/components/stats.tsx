import cn from 'clsx';
import Link from 'next/link';

import { Button, Text, Heading } from 'xy-ui';
import { Framework } from '@/types';

type Stats = {
  label: string;
  value: string | number;
};

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
  linkLabel?: string;
  className?: string;
}) {
  return (
    <div className={cn('lg:flex px-4 lg:px-10', className)}>
      <div className="flex place-content-between lg:space-x-24 grow">
        {stats.map((s) => (
          <div key={`${s.label}-${s.value}`} className="text-center">
            <Heading className={cn('font-bold', `text-${variant}`)}>
              {s.value}
            </Heading>
            <Text size="lg">{s.label}</Text>
          </div>
        ))}
      </div>
      <div className="lg:ml-20 mt-8 lg:mt-0">
        <Text variant="light">{description}</Text>
        {link && (
          <Button asChild variant="pro" className={`mt-4 text-${variant}`}>
            <Link href={link}>{linkLabel}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
