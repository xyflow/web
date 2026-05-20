'use client';

import { cloneElement, ReactElement, type ReactNode } from 'react';
import { Heading } from '../ui/heading';
import { Text } from '../ui/text';
import { cn } from '../../lib/utils';

import { useConnectionDrawer } from '../../hooks/use-connection-drawer';

export type HeroProps = {
  title?: ReactNode;
  subtitle?: ReactNode;
  kicker?: ReactNode;
  kickerIcon?: ReactElement;
  action?: ReactNode;
  className?: string;
  align?: 'left' | 'center';
  children?: ReactNode;
  size?: 'md' | 'lg' | 'xl';
  backgroundVariant?: 'gradient' | 'image';
};

export function Hero({
  title,
  subtitle,
  kicker,
  kickerIcon,
  action,
  children,
  className,
  align = 'left',
  size = 'lg',
  backgroundVariant,
}: HeroProps) {
  const isCenter = align === 'center';
  const isXL = size === 'xl';
  const ref = useConnectionDrawer();

  return (
    <div ref={ref}>
      {backgroundVariant === 'gradient' && (
        <div
          className="pointer-events-none absolute left-1/2 -mt-16 h-[70vw] w-[100vw] -translate-x-1/2 -translate-y-1/2 opacity-10 dark:opacity-20"
          style={{
            background: `radial-gradient(hsl(var(--accent) / 1) 0%, hsl(var(--accent) / 0.5) 25%, hsl(var(--background)) 60%)`,
          }}
        />
      )}

      {backgroundVariant === 'image' && (
        <div className="relative">
          <div className="bg-gradient pointer-events-none absolute h-[50vw] w-full bg-contain bg-[90%_top] bg-no-repeat lg:bg-[length:50%]" />
        </div>
      )}

      <div
        className={cn(
          'relative z-10',
          !isCenter && 'grid lg:grid-cols-2 lg:gap-40',
          isCenter && 'mx-auto max-w-3xl',
          isXL && 'max-w-6xl',
          className,
        )}
      >
        <div className={cn(isCenter && 'text-center')}>
          {kicker && (
            <h3
              className={cn(
                'text-primary mb-6 flex items-center text-sm font-bold uppercase tracking-wider',
                isCenter && 'justify-center',
              )}
            >
              {kickerIcon &&
                cloneElement(kickerIcon, {
                  className: 'inline-block w-6 h-6 mr-1',
                } as React.HTMLAttributes<HTMLElement>)}
              {kicker}
            </h3>
          )}
          {title && (
            <Heading as="h1" size={size} className="mb-6 font-black">
              {title}
            </Heading>
          )}
          {subtitle && (
            <Text
              size="lg"
              className={cn('mb-4 max-w-3xl leading-7 lg:mb-6', isCenter && 'mx-auto')}
            >
              {subtitle}
            </Text>
          )}
          {action && <div>{action}</div>}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
