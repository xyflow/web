import { type PropsTableProps } from 'xy-shared';

export const signature: PropsTableProps = {
  props: [
    { name: 'Returns' },
    {
      name: '',
      type: 'Edge<T>[]',
      description: 'An array of all edges currently in the flow.',
    },
  ],
};
