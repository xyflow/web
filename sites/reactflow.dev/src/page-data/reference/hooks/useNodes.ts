import { type PropsTableProps } from 'xy-shared';

export const signature: PropsTableProps = {
  props: [
    { name: 'Returns' },
    {
      name: '',
      type: 'Node<T>[]',
      description: 'An array of all nodes currently in the flow.',
    },
  ],
};
