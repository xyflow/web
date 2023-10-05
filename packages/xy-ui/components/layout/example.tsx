'use client';

import { type ReactNode } from 'react';
import { useConfig } from 'nextra-theme-docs';
import { Heading } from '../../';

/**
 * This basic layout is used for all the example pages across reactflow.dev and
 * svelteflow.dev.
 *
 */
export function ExampleLayout({ children }: { children: ReactNode }) {
  const { frontMatter } = useConfig();

  return (
    <>
      <Heading size="md" className="mt-6">
        {frontMatter.title}
      </Heading>

      {children}
    </>
  );
}
