import { type ReactNode } from 'react';

import { Heading, Text, cn } from 'xy-ui';
import useXYSite from '@/hooks/use-xy-site';
import useConnectionDrawer from '@/hooks/use-connection-drawer';

type HeroProps = {
  title?: ReactNode;
  subtitle?: ReactNode;
  kicker?: ReactNode;
  className?: string;
  align?: 'left' | 'center';
  children?: ReactNode;
  size?: 'md' | 'lg' | 'xl';
  showGradient?: boolean;
};

export default function Hero({
  title,
  subtitle,
  kicker,
  children,
  className,
  align = 'left',
  size = 'lg',
  showGradient = false,
}: HeroProps) {
  const { site } = useXYSite();
  const isCenter = align === 'center';
  const isXL = size === 'xl';
  const ref = useConnectionDrawer();

  return (
    <div ref={ref}>
      {showGradient && (
        <div
          className="absolute -mt-16 opacity-10 w-[100vw] h-[70vw] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            background:
              'radial-gradient(rgba(68,91,222,1) 0%, rgba(215,78,243,1) 25%, rgba(255,255,255,1) 50%)',
          }}
        />
      )}

      <div
        className={cn(
          'relative z-10',
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
                'text-md font-bold mb-2 flex items-center',
                isCenter && 'justify-center',
                `text-${site}`
              )}
            >
              {kicker}
            </h3>
          )}
          {title && (
            <Heading size={size} className="mb-4 font-black">
              {title}
            </Heading>
          )}
          {subtitle && (
            <Text
              size="lg"
              className={cn('mb-4 lg:mb-6 max-w-3xl', isCenter && 'mx-auto')}
            >
              {subtitle}
            </Text>
          )}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
