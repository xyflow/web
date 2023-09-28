import { type PropsTableProps } from '@/components/props-table';

export const signature: PropsTableProps = {
  props: [
    { name: 'Params' },
    { name: 'node', type: 'Node' },
    { name: 'nodes', type: 'Node[]' },
    { name: 'edges', type: 'Edge[]' },
    { name: 'Returns' },
    { name: '', type: 'Node[]' },
  ],
};
