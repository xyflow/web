import { type PropsTableProps } from 'xy-ui';

export const connectionFields: PropsTableProps = {
  props: [
    { name: 'source', type: 'string | null' },
    { name: 'target', type: 'string | null' },
    { name: 'sourceHandle', type: 'string | null' },
    { name: 'targetHandle', type: 'string | null' },
  ],
};
