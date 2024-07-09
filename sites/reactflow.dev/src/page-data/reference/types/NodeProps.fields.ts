import { type PropsTableProps } from 'xy-shared';

export const nodePropsFields: PropsTableProps = {
  props: [
    { name: 'id', type: 'string;' },
    { name: 'data', type: 'T;' },
    {
      name: 'dragHandle?',
      type: 'string;',
      description: `A class name that can be applied to elements inside the node
      that allows those elements to act as drag handles, letting the user drag the
      node by clicking and dragging on those elements.`,
    },
    { name: 'type', type: 'string;' },
    { name: 'selected', type: 'boolean;' },
    { name: 'isConnectable', type: 'boolean;' },
    { name: 'zIndex', type: 'number;' },
    { name: 'positionAbsoluteX', type: 'number;' },
    { name: 'positionAbsoluteY', type: 'number;' },
    { name: 'dragging', type: 'boolean;' },
    { name: 'targetPosition', type: 'Position;' },
    { name: 'sourcePosition', type: 'Position;' },
  ],
};
