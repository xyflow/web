import { Text } from 'xy-ui';
import Link from 'next/link';
import React, { useCallback, useMemo } from 'react';

import * as reactFlowTypes from '@/pages/reference/types/_meta.json';

export type PropsTableProps = {
  props: {
    name: string;
    type?: string;
    default?: string;
    description?: string;
  }[];
  variant?: 'react' | 'svelte';
  links?: Record<string, string>;
  info?: Record<string, string>;
  deeplinkPrefix?: string;
};

export function PropsTable({
  props = [],
  variant = 'react',
  links = {},
  deeplinkPrefix = '',
}: PropsTableProps) {
  // We can hide the default column entirely if none of the props have a default
  // value to document.
  const shouldShowDefault = props.some((prop) => !!prop.default);
  //
  const allLinks = useMemo(
    () => ({
      ...links,
      ...externalLinks,
      ...(variant === 'react' ? externalReactLinks : externalSvelteLinks),
      ...(variant === 'react' ? reactFlowLinks : {}),
    }),
    [variant, links],
  );
  // This function takes a string representing some type and attempts to turn any
  // types referenced inside into links, either internal or external.
  const linkify = useCallback(
    (type: string) =>
      type.match(/(\w+|\W+)/g).map((chunk, i) =>
        chunk in allLinks ? (
          <Link
            key={`${chunk}-${i}`}
            href={allLinks[chunk] ?? ''}
            className="text-react"
          >
            {chunk}
          </Link>
        ) : (
          chunk
        ),
      ),
    [links],
  );

  return (
    <table className="table-fixed w-full my-8 rounded-xl relative">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-2 py-2 w-[3%]" />
          <th align="left" className="py-2 px-2 w-[27%]">
            Name
          </th>
          <th
            align="left"
            className="py-2 px-2"
            style={{ width: shouldShowDefault ? '50%' : '70%' }}
          >
            Type
          </th>
          {shouldShowDefault && (
            <th align="left" className="py-2 px-2 hidden md:table-cell w-[20%]">
              Default
            </th>
          )}
        </tr>
      </thead>

      {/* This might seem like a hella contrived way to go about things but let
          me break it down. For props with an optional description, we want to
          render a second row underneath the usual defaults, and crucially we
          want that row to span both the "type" and "default" columns.

          That means we can't just plonk the description in an existing <td>. Your
          first instinct might be to just render a fragment and produce two rows,
          and that was mine too! 

          It's super nit-picky but if you do this group-hover doesn't work correctly
          and the description row doesn't turn grey when the user hovers over it.

          It turns our it's semanticall valid to render as many <tbody>s as you 
          like as long as they all appear after a <thead> and before a <tfoot>,
          so that's what we have to do.

          We need the markup to be semantically valid because next "helpfully"
          does markup validation when statically generating pages.
      */}
      {props.map((prop) => {
        const name = prop.name.toLowerCase().trim();
        const id = deeplinkPrefix ? `${deeplinkPrefix}-${name}` : name;

        return (
          <tbody key={id} className="hover:bg-gray-50 group border-t">
            {!prop.type && !prop.default ? (
              <tr className="bg-gray-50 border-t">
                <td className="px-2 w-8">
                  <Link
                    className={`invisible group-hover:visible text-${variant}`}
                    href={`#${id}`}
                  >
                    #
                  </Link>
                </td>
                <th
                  colSpan={3}
                  className="py-1 px-2 font-bold sticky top-0 text-left"
                >
                  {prop.name}
                </th>
              </tr>
            ) : (
              <>
                <tr id={id}>
                  <td className="px-2 w-8">
                    <Link
                      className={`invisible group-hover:visible text-${variant}`}
                      href={`#${id}`}
                    >
                      #
                    </Link>
                  </td>
                  <td className="flex justify-between py-1 px-2">
                    <Text>{prop.name}</Text>
                  </td>
                  <td className="px-2 text-sm">
                    <code>{linkify(prop.type)}</code>
                  </td>
                  {shouldShowDefault && (
                    <td className="px-2 text-sm hidden md:table-cell">
                      {prop.default ? (
                        <code>{linkify(prop.default)}</code>
                      ) : (
                        '-'
                      )}
                    </td>
                  )}
                </tr>

                {prop.description && (
                  <tr className="!border-0">
                    <td className="px-2" colSpan={2} />
                    <td className="px-2" colSpan={2}>
                      <Text>{prop.description}</Text>
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        );
      })}
    </table>
  );
}

// -----------------------------------------------------------------------------

export const reactFlowLinks = Object.fromEntries(
  Object.keys(reactFlowTypes).map((t) =>
    t === 'default'
      ? []
      : [
          // We want to link to the type when our docs refer to a namedspaced value like
          // `Position.Left`. Splitting on the period and taking the first part will
          // always give us the type name.
          t.split('.')[0],
          `/react-flow/api/types/${t}`,
        ],
  ),
);

const externalReactLinks = {
  ComponentType:
    'https://github.com/DefinitelyTyped/DefinitelyTyped/blob/61c7bb49838a155b2b0476bb97d5e707ca80a23b/types/react/v17/index.d.ts#L75',
  CSSProperties:
    'https://github.com/DefinitelyTyped/DefinitelyTyped/blob/61c7bb49838a155b2b0476bb97d5e707ca80a23b/types/react/v17/index.d.ts#L1545',
  Dispatch:
    'https://github.com/DefinitelyTyped/DefinitelyTyped/blob/bdd784f597ef151da8659762300621686969470d/types/react/v17/index.d.ts#L879',
  DragEvent:
    'https://github.com/DefinitelyTyped/DefinitelyTyped/blob/0cb3553dbd4f91bf6c20e1f4e8bc56197b1e61f8/types/d3-drag/index.d.ts#L281C1-L281C1',
  MouseEvent:
    'https://github.com/DefinitelyTyped/DefinitelyTyped/blob/61c7bb49838a155b2b0476bb97d5e707ca80a23b/types/react/v17/index.d.ts#L1226C6-L1226C6',
  ReactNode:
    'https://github.com/DefinitelyTyped/DefinitelyTyped/blob/d7e13a7c7789d54cf8d601352517189e82baf502/types/react/index.d.ts#L264',
  SetStateAction:
    'https://github.com/DefinitelyTyped/DefinitelyTyped/blob/bdd784f597ef151da8659762300621686969470d/types/react/v17/index.d.ts#L879',
  StoreApi:
    'https://github.com/pmndrs/zustand/blob/0426978490e8b14f40443bcbb2332e103076510b/src/vanilla.ts#L8',
};

export const svelteFlowLinks = {};

const externalSvelteLinks = {};

const externalLinks = {
  Partial:
    'https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype',
  Record:
    'https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type',
};
