import { type PropsTableProps } from '@/components/props-table';

export const connectionLineComponentPropsFields: PropsTableProps = {
  props: [
    ['connectionLineStyle', 'CSSProperties'],
    ['connectionLineType', 'ConnectionLineType'],
    ['fromNode', 'Node'],
    ['fromHandle', 'HandleElement'],
    ['fromX', 'number'],
    ['fromY', 'number'],
    ['toX', 'number'],
    ['toY', 'number'],
    ['fromPosition', 'Position'],
    ['toPosition', 'Position'],
    ['connectionStatus', 'ConnectionStatus | null'],
  ],
};
