import { type PropsTableProps } from '@/components/props-table';

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
