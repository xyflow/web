import { type PropsTableProps } from 'xy-ui';

export const nodePropsFields: PropsTableProps = {
  props: [
    { name: 'id', type: 'string;' },
    { name: 'data', type: 'T;' },
    { name: 'dragHandle', type: 'boolean;' },
    { name: 'type', type: 'string;' },
    { name: 'selected', type: 'boolean;' },
    { name: 'isConnectable', type: 'boolean;' },
    { name: 'zIndex', type: 'number;' },
    { name: 'xPos', type: 'number;' },
    { name: 'yPos', type: 'number;' },
    { name: 'dragging', type: 'boolean;' },
    { name: 'targetPosition', type: 'Position;' },
    { name: 'sourcePosition', type: 'Position;' },
  ],
};
