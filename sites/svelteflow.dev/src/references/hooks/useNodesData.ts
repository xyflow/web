import { type PropsTableProps } from 'xy-shared';

export const signature: PropsTableProps = {
  props: [
    { name: 'Params' },
    {
      name: 'nodeId',
      type: 'string | string[]',
    },
    { name: 'Returns' },
    {
      name: '',
      type: 'Readable<{ id: string, type:string, data: object} | { id: string, type:string, data: object}[]>',
      description:
        'A readable store with id, type and data object/s of passed node id/s.',
    },
  ],
};
