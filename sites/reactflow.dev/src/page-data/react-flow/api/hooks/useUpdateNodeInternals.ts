import { type PropsTableProps } from '@/components/props-table';

export const signature: PropsTableProps = {
  props: [
    { name: 'Returns' },
    {
      name: '',
      type: '(nodeId: string | string[]) => void',
      description: `Use this function to tell React Flow to update the internal
      state of one or more nodes that you have changed programmatically.`,
    },
  ],
};
