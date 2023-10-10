import { type PropsTableProps } from 'xy-ui';

export const signature: PropsTableProps = {
  props: [
    { name: 'Returns' },
    {
      name: '',
      type: '(nodeId: string | string[]) => void',
      description: `Use this function to update the internal
      state of one or more nodes that you have changed programmatically.`,
    },
  ],
};
