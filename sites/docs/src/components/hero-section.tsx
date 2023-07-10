import { type ReactNode } from 'react';
import cn from 'clsx';

import { Heading, Text } from 'xy-ui';
import useXYSite from '@/hooks/use-xy-site';

type HeroSectionProps = {
  title?: ReactNode;
  subtitle?: ReactNode;
  kicker?: ReactNode;
  className?: string;
  align?: 'left' | 'center';
  children?: ReactNode;
  size?: 'md' | 'lg' | 'xl';
};

export default function HeroSection({
  title,
  subtitle,
  kicker,
  children,
  className,
  align = 'left',
  size = 'lg',
}: HeroSectionProps) {
  const { site } = useXYSite();
  const isCenter = align === 'center';
  const isXL = size === 'xl';

  return (
    <div
      className={cn(
        !isCenter && 'grid lg:grid-cols-2 lg:gap-40',
        isCenter && 'max-w-3xl mx-auto',
        isXL && 'max-w-6xl',
        className
      )}
    >
      <div className={cn(isCenter && 'text-center')}>
        {kicker && (
          <h3
            className={cn(
              'text-sm font-bold mb-2 site flex items-center ',
              isCenter && 'justify-center',
              `text-${site}`
            )}
          >
            {kicker}
          </h3>
        )}
        {title && (
          <Heading
            size={size}
            className={cn('mb-4 font-black', isXL && 'leading-normal')}
          >
            {title}
          </Heading>
        )}
        {subtitle && (
          <Text size="lg" className="mb-8 max-w-3xl mx-auto">
            {subtitle}
          </Text>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}
