import { useRef } from 'react';
import { SparklesIcon, HeartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { Button } from 'xy-ui';
import Hero from '@/page-sections/hero';
import useXYSite from '@/hooks/use-xy-site';
import Flow from './flow';
import { Framework } from '@/types';

const subtitle = {
  react:
    'A customizable React component for building node-based editors and interactive diagrams',
  svelte:
    'A customizable Svelte component for building node-based editors and interactive diagrams',
};

const proButtonHref = {
  react: '/react-flow/pro',
  svelte: '/svelte-flow/support-us',
};

const proButtonIcon = {
  react: SparklesIcon,
  svelte: HeartIcon,
};

const proButtonLabel = {
  react: 'React Flow Pro',
  svelte: 'support Us',
};

export default function HeroFlow() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const { site, lib } = useXYSite();
  const ProIcon = proButtonIcon[site];

  return (
    <div className="relative right-1/2 left-1/2 ml-[-50vw] mr-[-50vw] max-w-[100vw] w-[100vw] -mt-16">
      <Hero
        title={
          <div ref={headlineRef}>
            Wire Your Ideas with <span className={`text-${site}`}>{lib}</span>
          </div>
        }
        subtitle={subtitle[site]}
        additionalContent={
          <div className="flex">
            <Button variant="secondary" asChild className="mr-2">
              <Link href={`/${site}-flow/docs`}>Docs</Link>
            </Button>
            <Button variant={`${site}-pro`} asChild>
              <Link href={proButtonHref[site]}>
                <ProIcon className="w-5 h-5 mr-1" /> {proButtonLabel[site]}
              </Link>
            </Button>
          </div>
        }
        className="pt-[15vh] pointer-events-none max-w-[90rem] pl-[max(env(safe-area-inset-left),1.5rem)] w-full absolute left-1/2 -translate-x-1/2"
        size="md"
      />

      <Flow variant={site as Framework} headlineRef={headlineRef} />
    </div>
  );
}
