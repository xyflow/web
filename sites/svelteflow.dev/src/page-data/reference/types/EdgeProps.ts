import { type PropsTableProps } from 'xy-ui';

export const edgePropsFields: PropsTableProps = {
  props: [
    { name: 'id', type: 'string' },
    { name: 'animated', type: 'boolean' },
    { name: 'data', type: 'T' },
    { name: 'style', type: 'string' },
    { name: 'selected', type: 'boolean' },
    { name: 'source', type: 'string' },
    { name: 'target', type: 'string' },
    { name: 'sourceHandleId?', type: 'string | null' },
    { name: 'targetHandleId?', type: 'string | null' },
    { name: 'interactionWidth', type: 'number' },
    { name: 'sourceX', type: 'number' },
    { name: 'sourceY', type: 'number' },
    { name: 'targetX', type: 'number' },
    { name: 'targetY', type: 'number' },
    { name: 'sourcePosition', type: 'Position' },
    { name: 'targetPosition', type: 'Position' },
    { name: 'label?', type: 'string' },
    { name: 'labelStyle?', type: 'string' },
    { name: 'markerStart?', type: 'string' },
    { name: 'markerEnd?', type: 'string' },
    { name: 'pathOptions?', type: 'any' },
  ],
};
