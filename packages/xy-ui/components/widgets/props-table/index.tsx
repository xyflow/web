import { useCallback } from 'react';
import Link from 'next/link';
import { Text } from '../../../.';

type PropsTableProps = {
  props: {
    name: string;
    type?: string;
    default?: string;
    description?: string;
  }[];
  links?: Record<string, string>;
  info?: Record<string, string>;
  deeplinkPrefix?: string;
};

function PropsTable({
  props = [],
  links = {},
  deeplinkPrefix = '',
}: PropsTableProps) {
  // We can hide the default column entirely if none of the props have a default
  // value to document.
  const shouldShowDefault = props.some((prop) => !!prop.default);

  // This function takes a string representing some type and attempts to turn any
  // types referenced inside into links, either internal or external.
  const linkify = useCallback(
    (type: string | undefined) =>
      type?.match(/(\w+|\W+)/g)?.map((chunk, i) =>
        chunk in links ? (
          <Link
            key={`${chunk}-${i}`}
            href={links[chunk] ?? ''}
            className="text-primary"
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
                    className={`invisible group-hover:visible text-primary`}
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
                      className={`invisible group-hover:visible text-primary`}
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

export { PropsTable, type PropsTableProps };
