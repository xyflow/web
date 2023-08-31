import Link from 'next/link';
import React, { useCallback } from 'react';
import { Popover, PopoverContent, PopoverTrigger, Text } from 'xy-ui';

export type PropsTableProps = {
  props: [name: string, type?: string, default_?: string][];
  links?: Record<string, string>;
  info?: Record<string, string>;
};

export function PropsTable({ props = [], links, info = {} }: PropsTableProps) {
  const shouldShowDefault = props.some(([, , default_]) => !!default_);
  const linkify = useCallback(
    (type: string) =>
      links === undefined
        ? type
        : type.match(/(\w+|\W+)/g).map((chunk) =>
            chunk in links ? (
              <Link href={links[chunk]} className="text-react">
                {chunk}
              </Link>
            ) : (
              chunk
            )
          ),
    [links]
  );
  const Info = useCallback(
    ({ name }: { name: string }) =>
      name in info && (
        <Popover>
          <PopoverTrigger>
            <Text
              size="xs"
              className="inline-flex border justify-center items-center hover:bg-gray-50 text-react rounded-lg w-6 h-6"
            >
              ?
            </Text>
          </PopoverTrigger>
          <PopoverContent>{info[name]}</PopoverContent>
        </Popover>
      ),
    [info]
  );

  return (
    <table className="table-auto w-full my-8 rounded-xl relative">
      <thead>
        <tr className="bg-gray-100">
          <th align="left" className="py-2 px-2">
            Name
          </th>
          <th className="px-2 py-2" />
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
      <tbody className="divide-y">
        {props.map(([name, type, default_]) => {
          if (!type && !default_) {
            return (
              <tr key={name} className="bg-gray-50">
                <th
                  colSpan={3}
                  className="py-1 px-2 font-bold sticky top-0 text-left"
                >
                  {name}
                </th>
              </tr>
            );
          }

          return (
            <tr key={name} className="hover:bg-gray-50">
              <td className="flex justify-between py-1 px-2">
                <Text>{name}</Text>
              </td>
              <td className="px-2">
                <Info name={name} />
              </td>
              <td className="px-2">
                <code>{linkify(type)}</code>
              </td>
              {shouldShowDefault && (
                <td className="px-2 hidden md:table-cell">
                  {default_ ? <code>{default_}</code> : '-'}
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
