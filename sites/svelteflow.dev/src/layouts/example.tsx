import { type ReactNode } from 'react';
import { useConfig } from 'nextra-theme-docs';

import { Heading } from 'xy-ui';

// this layout is used for the example pages
export default function ExampleLayout({ children }: { children: ReactNode }) {
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
