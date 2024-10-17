import { type PropsTableProps } from 'xy-shared';

export const baseEdgeProps: PropsTableProps = {
  props: [
    { name: 'id', type: 'string' },
    { name: 'interactionWidth', type: 'number' },
    { name: 'path', type: 'string' },
    { name: 'style', type: 'string' },
    { name: 'class', type: 'string' },
    { name: 'markerStart', type: 'string' },
    { name: 'markerEnd', type: 'string' },
    { name: 'label', type: 'string' },
    { name: 'labelX', type: 'number' },
    { name: 'labelY', type: 'number' },
    { name: 'labelStyle', type: 'string' },
  ],
};
