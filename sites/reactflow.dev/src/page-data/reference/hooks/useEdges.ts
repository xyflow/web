import { type PropsTableProps } from 'xy-ui';

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
