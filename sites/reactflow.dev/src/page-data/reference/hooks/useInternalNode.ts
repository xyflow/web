import { type PropsTableProps } from 'xy-shared';

export const signature: PropsTableProps = {
  props: [
    { name: 'Params' },
    {
      name: 'nodeId',
      type: 'string',
      description: 'The ID of a node you want to observe',
    },
    { name: 'Returns' },
    {
      name: '',
      type: 'InternalNode<T>',
      description: 'The InternalNode object for the node with the given ID',
    },
  ],
};
