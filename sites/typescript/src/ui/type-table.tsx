import cn from 'clsx';
import Link from 'next/link';
import { Code, Popup } from 'nextra/components';
import { InformationCircleIcon as InfoIcon } from 'nextra/icons';
import type { FC, ReactNode } from 'react';

const Info: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Popup>
      <Popup.Button>
        <InfoIcon className="size-4" />
      </Popup.Button>
      <Popup.Panel className="max-h-[400px] max-w-[400px] min-w-[220px] overflow-auto text-sm">
        {/* @ts-expect-error */}
        {children}
      </Popup.Panel>
    </Popup>
  );
};

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

const classes = {
  field: cn('inline-flex items-center gap-1'),
  code: cn('rounded-md bg-fd-secondary p-1 text-fd-secondary-foreground'),
  blue: 'bg-fd-primary/10 text-fd-primary',
};

export const TypeTable: FC<{ type: Record<string, ObjectType> }> = ({ type }) => {
  return (
    <div className="my-6 overflow-x-auto nextra-scrollbar">
      <table className="text-fd-muted-foreground text-sm">
        <thead>
          <tr>
            <th align="left" className="w-1/3">
              Name
            </th>
            <th align="left">Type</th>
            <th align="left">Default</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(type).map(([key, value]) => (
            <tr key={key}>
              <td>
                <div className={classes.field}>
                  <Code>
                    {key}
                    {!value.required && '?'}
                  </Code>
                  {value.description && <Info>{value.description}</Info>}
                </div>
              </td>
              <td>
                <Code>{value.type}</Code>
                {value.typeDescription && <Info>{value.typeDescription}</Info>}
                {value.typeDescriptionLink && (
                  <Link href={value.typeDescriptionLink}>
                    <InfoIcon className="size-4" />
                  </Link>
                )}
              </td>
              <td>{value.default ? <Code>{value.default}</Code> : <span>-</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
