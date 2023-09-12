import { type PropsTableProps } from '@/components/props-table';

export const baseEdgeProps: PropsTableProps = {
  props: [
    ['id', 'string'],
    ['style', 'React.CSSProperties'],
    ['interactionWidth', 'number'],
    ['path', 'string'],
    ['markerStart', 'string'],
    ['markerEnd', 'string'],
    ['label', 'string | React.ReactNode'],
    ['labelX', 'number'],
    ['labelY', 'number'],
    ['labelStyle', 'React.CSSProperties'],
    ['labelShowBg', 'boolean'],
    ['labelBgStyle', 'React.CSSProperties'],
    ['labelBgPadding', '[number, number]'],
    ['labelBgBorderRadius', 'number'],
  ],
};
