import { type ReactNode } from 'react';
import cn from 'clsx';

import useXYSite from '@/hooks/use-xy-site';

type HeroSectionProps = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  kicker?: React.ReactNode;
  className?: string;
  align?: 'left' | 'center';
  children?: ReactNode;
};

export default function HeroSection({
  title,
  subtitle,
  kicker,
  children,
  className,
  align = 'left',
}: HeroSectionProps) {
  const { site } = useXYSite();
  const isCenter = align === 'center';

  return (
    <div
      className={cn(
        !isCenter && 'grid lg:grid-cols-2 lg:gap-40',
        isCenter && 'max-w-3xl mx-auto',
        className
      )}
    >
      <div className={cn(isCenter && 'text-center')}>
        {kicker && (
          <h3
            className={cn(
              'text-sm font-bold mb-2 site uppercase flex items-center justify-center',
              `text-${site}`
            )}
          >
            {kicker}
          </h3>
        )}
        {title && <h1 className="text-6xl font-black mb-4">{title}</h1>}
        {subtitle && <h2 className="text-xl mb-8">{subtitle}</h2>}
      </div>
      <div>{children}</div>
    </div>
  );
}
