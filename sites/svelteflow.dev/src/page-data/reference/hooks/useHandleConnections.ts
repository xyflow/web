import { type PropsTableProps } from 'xy-shared';

export const signature: PropsTableProps = {
  props: [
    { name: 'Params' },
    {
      name: 'nodeId',
      type: 'string',
    },
    {
      name: 'type',
      type: 'HandleType',
      description: 'The type of the handle',
    },
    {
      name: 'id',
      optional: true,
      type: 'string',
      description:
        'The id of the handle. This is only necessary if you have multiple handles of the same type.',
    },

    { name: 'Returns' },
    {
      name: '',
      type: 'Readable<Connection[]>',
      description:
        'A readable store of the connections that are connected to this handle.',
    },
  ],
};
