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
          className="absolute -mt-16 opacity-10 w-[100vw] h-[70vw] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            background:
              'radial-gradient(rgba(68,91,222,1) 0%, rgba(215,78,243,1) 25%, rgba(255,255,255,1) 50%)',
          }}
        />
      )}

      {backgroundVariant === 'image' && (
        <div className="relative">
          <div className="absolute w-full h-[50vw] bg-gradient bg-no-repeat bg-contain lg:bg-[length:50%] bg-[90%_top] pointer-events-none" />
        </div>
      )}

      <div
        className={cn(
          'relative z-10',
          !isCenter && 'grid lg:grid-cols-2 lg:gap-40',
          isCenter && 'max-w-3xl mx-auto',
          isXL && 'max-w-6xl',
          className,
        )}
      >
        <div className={cn(isCenter && 'text-center')}>
          {kicker && (
            <h3
              className={cn(
                'text-sm font-bold mb-6 flex items-center uppercase tracking-wider text-primary',
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
              className={cn('leading-7 mb-4 lg:mb-6 max-w-3xl', isCenter && 'mx-auto')}
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
