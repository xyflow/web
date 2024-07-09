import { type PropsTableProps } from 'xy-shared';

export const nodeFields: PropsTableProps = {
  props: [
    { name: 'id', type: 'string' },
    { name: 'position', type: 'XYPosition' },
    { name: 'data', type: 'T' },
    { name: 'type?', type: 'U' },
    { name: 'sourcePosition?', type: 'Position' },
    { name: 'targetPosition?', type: 'Position' },
    {
      name: 'hidden?',
      type: 'boolean',
      description: `Whether or not the node should be visible on the canvas.`,
    },
    { name: 'selected?', type: 'boolean' },
    {
      name: 'dragging?',
      type: 'boolean',
      description: `Whether or not the node is currently being dragged.`,
    },
    {
      name: 'draggable?',
      type: 'boolean',
      description: `Whether or not the node is able to be dragged.`,
    },
    { name: 'selectable?', type: 'boolean' },
    { name: 'connectable?', type: 'boolean' },
    { name: 'resizing?', type: 'boolean' },
    { name: 'deletable?', type: 'boolean' },
    { name: 'dragHandle?', type: 'string' },
    { name: 'width?', type: 'number | null' },
    { name: 'height?', type: 'number | null' },
    { name: 'parentNode?', type: 'string' },
    { name: 'parentId?', type: 'string' },
    { name: 'zIndex?', type: 'number' },
    { name: 'extent?', type: '"parent" | CoordinateExtent' },
    {
      name: 'expandParent?',
      type: 'boolean',
      description: `When true, the parent node will automatically expand if this
      node is dragged to the edge of the parent node's bounds.`,
    },
    { name: 'positionAbsolute?', type: 'XYPosition' },
    { name: 'ariaLabel?', type: 'string' },
    { name: 'focusable?', type: 'boolean' },
    { name: 'style?', type: 'React.CSSProperties' },
    { name: 'className?', type: 'string' },
    { name: 'handles?', type: 'NodeHandle[]' },
    { name: 'origin?', type: 'NodeOrigin' },
    {
      name: 'measured?',
      type: '{ width?: number, height?: number }',
    },
  ],
};
