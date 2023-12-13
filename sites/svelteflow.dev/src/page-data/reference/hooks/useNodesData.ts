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
      type: 'Readable<object | object[]>',
      description: 'A readable store with data object/s of passed node id/s.',
    },
  ],
};
