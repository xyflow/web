import type { CSSProperties, ReactNode } from 'react';
import { Heading } from '../ui/heading';
import { Text } from '../ui/text';

import { LayoutBreakout } from '../../layouts/breakout';

import Flow from './flow';

const headlineStyle: CSSProperties = {
  pointerEvents: 'all',
};

type HeroFlowProps = {
  initialColor?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
};

function HeroFlow({
  initialColor = '#111',
  title = '',
  subtitle,
  action,
}: HeroFlowProps) {
  return (
    <LayoutBreakout className="h-[600px] lg:h-[550px] xl:h-[600px] -mt-10 lg:-mt-14 2xl:-mt-18">
      <div className="pointer-events-none x:max-w-(--nextra-content-width) w-full absolute left-1/2 top-8 lg:top-[130px] -translate-x-1/2 z-10">
        <div
          style={headlineStyle}
          className="text-center mx-auto lg:mx-0 lg:text-left max-w-lg relative bg-white/10 backdrop-blur-[2px] px-3 lg:px-[35px]"
        >
          <Heading size="lg" as="h1" className="mb-4 font-black">
            Wire your ideas with <span className="text-primary">{title}</span>
          </Heading>

          {subtitle && (
            <Text className="mb-4 lg:mb-6 text-xl" as="h2">
              {subtitle}
            </Text>
          )}

          {action && <div className="flex justify-center lg:justify-start">{action}</div>}
        </div>
      </div>

      <Flow initialColor={initialColor} />
    </LayoutBreakout>
  );
}

export { HeroFlow, type HeroFlowProps };
