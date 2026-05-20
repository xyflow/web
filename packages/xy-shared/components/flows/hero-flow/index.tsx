import type { CSSProperties, ReactNode } from 'react';
import { Heading } from '../../../components/ui/heading';
import { Text } from '../../../components/ui/text';

import { LayoutBreakout } from '../../../layouts/breakout';

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
    <LayoutBreakout className="2xl:-mt-18 -mt-10 h-[600px] lg:-mt-14 lg:h-[550px] xl:h-[600px]">
      <div className="x:max-w-(--nextra-content-width) pointer-events-none absolute left-1/2 top-8 z-10 w-full -translate-x-1/2 lg:top-[130px]">
        <div
          style={headlineStyle}
          className="relative mx-auto max-w-lg px-3 text-center backdrop-blur-[2px] lg:mx-0 lg:px-[35px] lg:text-left"
        >
          <Heading size="lg" as="h1" className="mb-4 font-black">
            Wire your ideas with <span className="text-primary">{title}</span>
          </Heading>

          {subtitle && (
            <Text className="mb-4 text-xl lg:mb-6" as="h2">
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
