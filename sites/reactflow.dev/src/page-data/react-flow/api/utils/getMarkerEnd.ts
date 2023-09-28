import { type PropsTableProps } from '@/components/props-table';

export const signature: PropsTableProps = {
  props: [
    { name: 'Params' },
    { name: 'markerType?', type: 'MarkerType' },
    { name: 'markerEndId?', type: 'string' },
    { name: 'Returns' },
    { name: '', type: 'string' },
  ],
};
