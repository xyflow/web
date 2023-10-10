import { type PropsTableProps } from 'xy-ui';

export const signature: PropsTableProps = {
  props: [
    { name: 'Params' },
    { name: 'options', type: 'object' },
    {
      name: 'options.onChange',
      type: '(params: { nodes: Node[]; edges: Edge[]; }) => void',
    },
    { name: 'Returns' },
    { name: '', type: 'void' },
  ],
};
