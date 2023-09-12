import Link from 'next/link';
import React, { useCallback, useMemo } from 'react';
import { Popover, PopoverContent, PopoverTrigger, Text } from 'xy-ui';

import * as reactFlowTypes from '../pages/react-flow/api/types/_meta.json';

export type PropsTableProps = {
  props: [name: string, type?: string, default_?: string][];
  variant?: 'react' | 'svelte';
  links?: Record<string, string>;
  info?: Record<string, string>;
  deeplinkPrefix?: string;
};

export function PropsTable({
  props = [],
  variant = 'react',
  links,
  info = {},
  deeplinkPrefix = '',
}: PropsTableProps) {
  const shouldShowDefault = props.some(([, , default_]) => !!default_);
  const allLinks = useMemo(
    () => ({
      ...links,
      ...externalLinks,
      ...(variant === 'react' ? externalReactLinks : externalSvelteLinks),
      ...(variant === 'react' ? reactFlowLinks : {}),
    }),
    [variant, links]
  );
  const linkify = useCallback(
    (type: string) =>
      type.match(/(\w+|\W+)/g).map((chunk, i) =>
        chunk in allLinks ? (
          <Link
            key={`${chunk}-${i}`}
            href={allLinks[chunk]}
            className="text-react"
          >
            {chunk}
          </Link>
        ) : (
          chunk
        )
      ),
    [links]
  );

  return (
    <table className="table-auto w-full my-8 rounded-xl relative">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-2 py-2" />
          <th align="left" className="py-2 px-2">
            Name
          </th>
          <th align="left" className="py-2 px-2">
            Type
          </th>
          {shouldShowDefault && (
            <th align="left" className="py-2 px-2 hidden md:table-cell">
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
      {props.map(([name, type, default_]) => {
        const id = name.toLowerCase().trim();

        return (
          <tbody key={id} className="hover:bg-gray-50 group border-t">
            {!type && !default_ ? (
              <tr className="bg-gray-50 border-t">
                <th
                  colSpan={3}
                  className="py-1 px-2 font-bold sticky top-0 text-left"
                >
                  {name}
                </th>
              </tr>
            ) : (
              <>
                <tr id={id}>
                  <td className="px-2 w-8">
                    <Link
                      className={`invisible group-hover:visible text-${variant}`}
                      href={
                        deeplinkPrefix ? `#${deeplinkPrefix}-${id}` : `#${id}`
                      }
                    >
                      #
                    </Link>
                  </td>
                  <td className="flex justify-between py-1 px-2">
                    <Text>{name}</Text>
                  </td>
                  <td className="px-2">
                    <code>{linkify(type)}</code>
                  </td>
                  {shouldShowDefault && (
                    <td className="px-2 hidden md:table-cell">
                      {default_ ? <code>{linkify(default_)}</code> : '-'}
                    </td>
                  )}
                </tr>

                {name in info && (
                  <tr className="!border-0">
                    <td className="px-2" colSpan={2} />
                    <td className="px-2" colSpan={2}>
                      {info[name]}
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
  Object.keys(reactFlowTypes).map((t) => [
    t.split('.')[0],
    `/react-flow/api/types/${t}`,
  ])
);

const externalReactLinks = {
  CSSProperties:
    'https://github.com/DefinitelyTyped/DefinitelyTyped/blob/61c7bb49838a155b2b0476bb97d5e707ca80a23b/types/react/v17/index.d.ts#L1545',
  MouseEvent:
    'https://github.com/DefinitelyTyped/DefinitelyTyped/blob/61c7bb49838a155b2b0476bb97d5e707ca80a23b/types/react/v17/index.d.ts#L1226C6-L1226C6',
  ComponentType:
    'https://github.com/DefinitelyTyped/DefinitelyTyped/blob/61c7bb49838a155b2b0476bb97d5e707ca80a23b/types/react/v17/index.d.ts#L75',
  Partial:
    'https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype',
};

export const svelteFlowLinks = {};

const externalSvelteLinks = {};

const externalLinks = {
  Partial:
    'https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype',
  Record:
    'https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type',
};
