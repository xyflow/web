'use client';

import { CSSProperties, ReactNode, useRef } from 'react';
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
  const headlineRef = useRef<HTMLDivElement>(null);

  return (
    <LayoutBreakout>
      <div className="pt-[10vh] pointer-events-none max-w-[90rem] w-full absolute left-1/2 -translate-x-1/2 z-10">
        <div
          ref={headlineRef}
          style={headlineStyle}
          className="text-center mx-auto lg:mx-0 lg:text-left max-w-lg relative bg-white/10 backdrop-blur-[2px] p-[max(env(safe-area-inset-left),1.5rem)]"
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

      <Flow
        initialColor={initialColor}
        headlineRef={headlineRef}
        className="bg-gradient"
      />
    </LayoutBreakout>
  );
}

export { HeroFlow, type HeroFlowProps };
