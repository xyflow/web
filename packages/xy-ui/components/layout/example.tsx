import { type ReactNode } from 'react';
import { Heading } from '../../';

export type ExampleLayoutProps = {
  frontMatter: { title: string };
  children: ReactNode;
};

/**
 * This basic layout is used for all the example pages across reactflow.dev and
 * svelteflow.dev.
 *
 */
export function ExampleLayout({ frontMatter, children }: ExampleLayoutProps) {
  return (
    <>
      <Heading size="md" className="mt-6">
        {frontMatter.title}
      </Heading>

      {children}
    </>
  );
}
