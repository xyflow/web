import { type PropsTableProps } from '@/components/props-table';

export const edgeMarkerFields: PropsTableProps = {
  props: [
    { name: 'type', type: 'MarkerType' },
    { name: 'color?', type: 'string' },
    { name: 'width?', type: 'number' },
    { name: 'height?', type: 'number' },
    { name: 'markerUnits?', type: 'string' },
    { name: 'orient?', type: 'string' },
    { name: 'strokeWidth?', type: 'number' },
  ],
};
