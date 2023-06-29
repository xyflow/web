import { useConfig, useMDXComponents } from 'nextra-theme-docs';
import { type ReactNode } from 'react';

// this component is used for the example pages
export default function ExampleLayout({ children }: { children: ReactNode }) {
  const { frontMatter } = useConfig();
  const { h1: H1 } = useMDXComponents();

  return (
    <>
      <H1>{frontMatter.title}</H1>
      {children}
    </>
  );
}
