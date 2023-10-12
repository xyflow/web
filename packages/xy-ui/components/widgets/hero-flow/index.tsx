import { CSSProperties, ReactNode } from 'react';
import { Heading, Text, LayoutBreakout } from '../../..';
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
    <LayoutBreakout className="h-[600px] lg:h-[550px] xl:h-[600px]">
      <div className="pointer-events-none max-w-[90rem] w-full absolute left-1/2 top-8 lg:top-[130px] -translate-x-1/2 z-10">
        <div
          style={headlineStyle}
          className="text-center mx-auto lg:mx-0 lg:text-left max-w-lg relative bg-white/10 backdrop-blur-[2px] px-[35px]"
        >
          <Heading size="lg" className="mb-4 font-black">
            Wire Your Ideas with <span className="text-primary">{title}</span>
          </Heading>

          {subtitle && (
            <Text className="mb-4 lg:mb-6 text-xl">
              A customizable React component for building node-based editors and
              interactive diagrams
            </Text>
          )}

          {action && (
            <div className="flex justify-center lg:justify-start">{action}</div>
          )}
        </div>
      </div>

      <Flow initialColor={initialColor} className="bg-gradient" />
    </LayoutBreakout>
  );
}

export { HeroFlow, type HeroFlowProps };
