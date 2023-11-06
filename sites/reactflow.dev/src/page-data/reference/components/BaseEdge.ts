import { type PropsTableProps } from 'xy-shared';

export const baseEdgeProps: PropsTableProps = {
  props: [
    { name: 'id', type: 'string' },
    { name: 'style', type: 'React.CSSProperties' },
    { name: 'interactionWidth', type: 'number' },
    { name: 'path', type: 'string' },
    { name: 'markerStart', type: 'string' },
    { name: 'markerEnd', type: 'string' },
    { name: 'label', type: 'string | React.ReactNode' },
    { name: 'labelX', type: 'number' },
    { name: 'labelY', type: 'number' },
    { name: 'labelStyle', type: 'React.CSSProperties' },
    { name: 'labelShowBg', type: 'boolean' },
    { name: 'labelBgStyle', type: 'React.CSSProperties' },
    { name: 'labelBgPadding', type: '[number, number]' },
    { name: 'labelBgBorderRadius', type: 'number' },
  ],
};
