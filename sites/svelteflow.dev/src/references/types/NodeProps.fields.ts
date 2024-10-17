import { type PropsTableProps } from 'xy-shared';

export const nodePropsFields: PropsTableProps = {
  props: [
    { name: 'id', type: 'string;' },
    { name: 'data', type: 'T;' },
    { name: 'dragHandle', type: 'boolean;' },
    { name: 'type', type: 'string;' },
    { name: 'selected', type: 'boolean;' },
    { name: 'isConnectable', type: 'boolean;' },
    { name: 'zIndex', type: 'number;' },
    { name: 'width', type: 'number;' },
    { name: 'height', type: 'number;' },
    { name: 'positionAbsolute', type: 'XYPosition;' },
    { name: 'targetPosition', type: 'Position;' },
    { name: 'sourcePosition', type: 'Position;' },
    { name: 'dragging', type: 'boolean;' },
  ],
};
