// TODO: remove this file after Nextra 4 migration
'use client';
import { evaluate } from 'nextra/components';
import { useData } from 'nextra/hooks';
import { MDXComponents } from 'nextra/mdx';

export function RemoteContent({
  mdx,
  scope,
  components,
}: {
  mdx: string;
  /**
   * An object mapping names to React components.
   * The key used will be the name accessible to MDX.
   *
   * @example `{ ComponentName: Component }` will be accessible in the MDX as `<ComponentName/>`.
   */
  components?: MDXComponents;
  /**
   * Pass-through variables for use in the MDX content
   */
  scope?: Record<string, unknown>;
}) {
  if (!mdx) {
    throw new Error(
      'You have not specified any MDX content to render. Please provide the `mdx` prop.',
    );
  }
  const MDXContent = evaluate(mdx, scope).default;

  return <MDXContent components={components} />;
}

RemoteContent.useTOC = () => [];

export function RemoteContentMDX({
  prop,
  scope,
  components,
}: {
  prop: string;
  /**
   * An object mapping names to React components.
   * The key used will be the name accessible to MDX.
   *
   * @example `{ ComponentName: Component }` will be accessible in the MDX as `<ComponentName/>`.
   */
  components?: MDXComponents;
  /**
   * Pass-through variables for use in the MDX content
   */
  scope?: Record<string, unknown>;
}) {
  const compiledSource = useData(prop ?? 'mdx');
  if (!compiledSource) {
    throw new Error(
      'RemoteContent must be used together with the `buildDynamicMDX` API',
    );
  }

  const MDXContent = evaluate(compiledSource, scope).default;

  return <MDXContent components={components} />;
}

// TODO: the TOC currently returns none
RemoteContentMDX.useTOC = () => [];
