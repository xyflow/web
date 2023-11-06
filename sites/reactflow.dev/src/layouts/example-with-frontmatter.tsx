import { useConfig } from 'nextra-theme-docs';
import { ExampleLayout as BaseExampleLayout } from 'xy-shared';

export type ExampleLayoutProps = {
  children: React.ReactNode;
};

export type ExampleFrontmatter = {
  title: string;
};

/**
 * This layout is a thin wrapper around the `ExampleLayout` we have defined in
 * `xy-ui`. We need to use this so we can access the YAML frontmatter from our
 * examples using nextra's `useConfig` hook.
 *
 * We can't use that hook directly in the `ExampleLayout` because it's not part
 * of this package, it wouldn't know where to look!
 *
 */
export function ExampleLayout({ children }) {
  const { frontMatter } = useConfig<ExampleFrontmatter>();

  return (
    <BaseExampleLayout frontMatter={frontMatter}>{children}</BaseExampleLayout>
  );
}

export default ExampleLayout;
