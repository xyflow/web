import { type PropsTableProps } from 'xy-shared';

export const nodeDimensionChangeFields: PropsTableProps = {
  props: [
    { name: 'id', type: 'string' },
    { name: 'type', type: '"dimensions"' },
    { name: 'dimensions?', type: 'Dimensions' },
    { name: 'updateStyle?', type: 'boolean' },
    { name: 'resizing?', type: 'boolean' },
  ],
};

export const nodePositionChangeFields: PropsTableProps = {
  props: [
    { name: 'id', type: 'string' },
    { name: 'type', type: '"position"' },
    { name: 'position?', type: 'XYPosition' },
    { name: 'positionAbsolute?', type: 'XYPosition' },
    { name: 'dragging?', type: 'boolean' },
  ],
};

export const nodeSelectionChangeFields: PropsTableProps = {
  props: [
    { name: 'id', type: 'string' },
    { name: 'type', type: '"select"' },
    { name: 'selected', type: 'boolean' },
  ],
};

export const nodeRemoveChangeFields: PropsTableProps = {
  props: [
    { name: 'id', type: 'string' },
    { name: 'type', type: '"remove"' },
  ],
};

export const nodeAddChangeFields: PropsTableProps = {
  props: [
    { name: 'item', type: 'Node<T>' },
    { name: 'type', type: '"add"' },
  ],
};

export const nodeResetChangeFields: PropsTableProps = {
  props: [
    { name: 'item', type: 'Node<T>' },
    { name: 'type', type: '"reset"' },
  ],
};
