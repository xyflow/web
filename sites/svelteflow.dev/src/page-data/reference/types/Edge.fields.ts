import { type PropsTableProps } from 'xy-shared';

export const defaultEdgeFields: PropsTableProps = {
  props: [
    { name: 'id', type: 'string' },
    { name: 'type', type: 'string' },
    { name: 'style?', type: 'string' },
    { name: 'class?', type: 'string' },
    { name: 'label?', type: 'string' },
    { name: 'source', type: 'string' },
    { name: 'target', type: 'string' },
    { name: 'sourceNode?', type: 'Node' },
    { name: 'targetNode?', type: 'Node' },
    { name: 'sourceHandle', type: 'string | null' },
    { name: 'targetHandle', type: 'string | null' },
    { name: 'data', type: 'T' },
    { name: 'hidden', type: 'boolean' },
    { name: 'animated', type: 'boolean' },
    { name: 'selected', type: 'boolean' },
    { name: 'deletable', type: 'boolean' },
    { name: 'selectable', type: 'boolean' },
    { name: 'markerStart', type: 'string | EdgeMarker' },
    { name: 'markerEnd', type: 'string | EdgeMarker' },
    { name: 'zIndex?', type: 'number' },
    { name: 'interactionWidth', type: 'number' },
    { name: 'ariaLabel', type: 'string' },
  ],
};

export const smoothStepEdgeTypeFields: PropsTableProps = {
  props: [
    { name: 'type', type: '"smoothstep"' },
    { name: 'pathOptions?', type: 'object' },
    { name: 'pathOptions.offset?', type: 'number' },
    { name: 'pathOptions.borderRadius?', type: 'number' },
  ],
};

export const bezierEdgeTypeFields: PropsTableProps = {
  props: [
    { name: 'type', type: '"default"' },
    { name: 'pathOptions?', type: 'object' },
    { name: 'pathOptions.curvature?', type: 'number' },
  ],
};
