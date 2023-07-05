import cn from 'clsx';
import Link from 'next/link';

import { Button } from 'xy-ui';
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
            <div className={cn('text-6xl font-bold', `text-${variant}`)}>
              {s.value}
            </div>
            <div className="text-lg">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="lg:ml-20 mt-8 lg:mt-0">
        <div className="text-light">{description}</div>
        {link && (
          <Button asChild variant="pro" className={`mt-4 text-${variant}`}>
            <Link href={link}>{linkLabel}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
