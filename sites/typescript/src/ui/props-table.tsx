import slugify from '@sindresorhus/slugify';
import cn from 'clsx';
import { Code } from 'nextra/components';
import { Link } from 'nextra-theme-docs';
import type { FC, ReactNode } from 'react';

// type PropsTableProps = {
//   props: {
//     name: string
//     type?: string
//     default?: string
//     description?: string
//     example?: string
//     optional?: boolean
//   }[]
//   links?: Record<string, string>
//   info?: Record<string, string>
//   deeplinkPrefix?: string
// }

interface ObjectType {
  /**
   * Additional description of the field
   */
  description: ReactNode;
  type: string;
  typeDescription: ReactNode;
  /**
   * Optional link to the type
   */
  typeDescriptionLink?: string;
  default?: string;
  required?: boolean;
}

export const PropsTable: FC<{
  type: Record<string, ObjectType>;
  typeLinkMap: Record<string, string>;
}> = ({ type, typeLinkMap }) => {
  // We can hide the default column entirely if none of the props have a default
  // value to document.
  const showDefaultColumn = true as any; // data.some(prop => prop.default)

  // This function takes a string representing some type and attempts to turn any
  // types referenced inside into links, either internal or external.
  const linkify = (type: string) => {
    const [rootType, ...rest] = type.split('.');
    if (rest.length) rest.unshift('');
    const href = typeLinkMap[rootType!];
    return (
      <Code>
        {href ? <Link href={href}>{rootType}</Link> : type}
        {rest.join('.')}
      </Code>
    );
  };

  return (
    <table className="my-8 w-full text-sm">
      <thead className="nextra-border border-b text-left max-lg:hidden">
        <tr>
          <th className="py-1.5">Name</th>
          <th className="p-1.5 px-3">Type</th>
          {showDefaultColumn && <th className="py-1.5">Default</th>}
        </tr>
      </thead>
      {Object.entries(type).map(([key, prop]) => {
        const id = slugify(key);
        return (
          <tbody
            key={id}
            className="group nextra-border hover:bg-gray-100 dark:hover:bg-primary-100/5 mb-5 rounded-xl max-lg:block max-lg:border"
          >
            <tr
              className="nextra-border max-lg:block lg:border-b lg:[&:not(:target)>td>a]:opacity-0"
              id={id}
            >
              <td className="relative py-3 max-lg:block max-lg:px-3">
                <a
                  href={`#${id}`}
                  className={cn(
                    'absolute top-0 right-0 text-lg font-black lg:top-1/2 lg:right-full lg:-translate-y-1/2',
                    'group-hover:!opacity-100 before:content-["#"]',
                    'p-3', // Increase hit box
                  )}
                />
                <Code>
                  {key}
                  {!prop.required && '?'}
                </Code>
              </td>
              <td className='p-3 max-lg:block max-lg:before:content-["Type:_"]'>
                {linkify(prop.type)}
                {prop.description && (
                  <div className="mt-2 text-sm">{prop.description}</div>
                )}
                {/*{prop.example && (*/}
                {/*  <div className="mt-2 rounded-lg border border-gray-200 bg-gray-50">*/}
                {/*    <pre>*/}
                {/*      <code>{prop.example}</code>*/}
                {/*    </pre>*/}
                {/*  </div>*/}
                {/*)}*/}
              </td>
              {showDefaultColumn && (
                // For the mobile view, we want to hide the default column entirely
                // if there is no content for it. We want this because otherwise
                // the default padding applied to table cells will add some extra
                // blank space we don't want.
                <td
                  className={cn(
                    'max-lg:block',
                    prop.default
                      ? 'py-3 max-lg:px-3 max-lg:before:content-["Default:_"]'
                      : 'lg:after:content-["–"]',
                  )}
                >
                  {prop.default && linkify(prop.default)}
                </td>
              )}
            </tr>
          </tbody>
        );
      })}
    </table>
  );
};
