import { CSSProperties, ReactNode, useRef } from 'react';
import { SparklesIcon, HeartIcon, BoltIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { Button, Heading, Text } from 'xy-ui';
import useXYSite from '@/hooks/use-xy-site';
import Flow from './flow';
import { Framework } from '@/types';
import { PRO_PLATFORM_OR_REACT_PRO_URL } from '@/constants';

console.log(PRO_PLATFORM_OR_REACT_PRO_URL);

const subtitle = {
  react:
    'A customizable React component for building node-based editors and interactive diagrams',
  svelte:
    'A customizable Svelte component for building node-based editors and interactive diagrams',
};

const proButtonHref = {
  react: PRO_PLATFORM_OR_REACT_PRO_URL,
  svelte: '/svelte-flow/support-us',
};

const proButtonIcon = {
  react: SparklesIcon,
  svelte: HeartIcon,
};

const proButtonLabel = {
  react: 'React Flow Pro',
  svelte: 'Support Us',
};

const headlineStyle: CSSProperties = {
  pointerEvents: 'all',
};

export default function HeroFlow() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const { site, lib } = useXYSite();
  const ProIcon = proButtonIcon[site];

  return (
    <LayoutBreakout>
      <div className="pt-[10vh] pointer-events-none max-w-[90rem] w-full absolute left-1/2 -translate-x-1/2 z-10">
        <div
          ref={headlineRef}
          style={headlineStyle}
          className="max-w-md relative bg-white/10 backdrop-blur-[2px] p-[max(env(safe-area-inset-left),1.5rem)]"
        >
          <Heading size="md" className="mb-4 font-black">
            Wire Your Ideas with <span className={`text-${site}`}>{lib}</span>
          </Heading>

          <Text size="lg" className="mb-4 lg:mb-6">
            {subtitle[site]}
          </Text>

          <div className="flex">
            <Button variant="secondary" asChild className="mr-3 ">
              <Link href={`/${site}-flow/docs`}>
                <BoltIcon className="w-5 h-5 mr-1" />
                Quickstart
              </Link>
            </Button>
            <Button variant={`${site}-pro`} asChild>
              <Link href={proButtonHref[site]}>
                <ProIcon className="w-5 h-5 mr-1" /> {proButtonLabel[site]}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Flow variant={site as Framework} headlineRef={headlineRef} />
    </LayoutBreakout>
  );
}

function LayoutBreakout({ children }: { children: ReactNode }) {
  return (
    <div className="relative right-1/2 left-1/2 ml-[-50vw] mr-[-50vw] max-w-[100vw] w-[100vw] -mt-16">
      {children}
    </div>
  );
}
