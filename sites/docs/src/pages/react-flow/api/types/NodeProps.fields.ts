import { type PropsTableProps } from '@/components/props-table';

export const nodePropsFields: PropsTableProps = {
  props: [
    ['id', 'string;'],
    ['data', 'T;'],
    ['dragHandle', 'boolean;'],
    ['type', 'string;'],
    ['selected', 'boolean;'],
    ['isConnectable', 'boolean;'],
    ['zIndex', 'number;'],
    ['xPos', 'number;'],
    ['yPos', 'number;'],
    ['dragging', 'boolean;'],
    ['targetPosition', 'Position;'],
    ['sourcePosition', 'Position;'],
  ],
};
