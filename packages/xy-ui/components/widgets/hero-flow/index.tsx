import { CSSProperties, ReactNode, useRef } from 'react';
import { SparklesIcon, BoltIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button, Heading, Text, LayoutBreakout } from '../../..';
import Flow from './flow';

const headlineStyle: CSSProperties = {
  pointerEvents: 'all',
};

type HeroFlowProps = {
  initialColor?: string;
  title?: string;
};

function HeroFlow({ initialColor = '#111', title = '' }: HeroFlowProps) {
  const headlineRef = useRef<HTMLDivElement>(null);

  return (
    <LayoutBreakout>
      <div className="pt-[10vh] pointer-events-none max-w-[90rem] w-full absolute left-1/2 -translate-x-1/2 z-10">
        <div
          ref={headlineRef}
          style={headlineStyle}
          className="max-w-md relative bg-white/10 backdrop-blur-[2px] p-[max(env(safe-area-inset-left),1.5rem)]"
        >
          <Heading size="md" className="mb-4 font-black">
            Wire Your Ideas with <span className="text-primary">{title}</span>
          </Heading>

          <Text size="lg" className="mb-4 lg:mb-6">
            A customizable React component for building node-based editors and
            interactive diagrams
          </Text>

          <div className="flex">
            <Button asChild className="mr-3 ">
              <Link href="/docs">
                <BoltIcon className="w-5 h-5 mr-1" />
                Quickstart
              </Link>
            </Button>
            <Button variant="pro" asChild>
              <Link href="/pro">
                <SparklesIcon className="w-5 h-5 mr-1" /> React Flow Pro
              </Link>
            </Button>
          </div>
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
