import { type PropsTableProps } from '@/components/props-table';

export const signature: PropsTableProps = {
  props: [
    { name: 'Params' },
    { name: 'edge', type: 'Edge' },
    { name: 'edges', type: 'Edge[]' },
    { name: 'Returns' },
    { name: '', type: 'Edge[]' },
  ],
};
