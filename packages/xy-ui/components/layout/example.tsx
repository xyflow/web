import { type ReactNode } from 'react';

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
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 leading-normal">
        {frontMatter.title}
      </h1>

      {children}
    </>
  );
}
