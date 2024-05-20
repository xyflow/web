import { type PropsTableProps } from 'xy-shared';

export const defaultEdgeFields: PropsTableProps = {
  props: [
    { name: 'id', type: 'string' },
    { name: 'type', type: 'string' },
    { name: 'style?', type: 'React.CSSProperties' },
    { name: 'className?', type: 'string' },
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
    { name: 'focusable', type: 'boolean' },
    {
      name: 'updatable?',
      type: 'boolean | "source" | "target"',
      description: `Determines whether the edge can be updated by dragging the
      source or target to a new node. This property only has an effect if the
      edgesUpdatable prop on your <ReactFlow/> component is set to true.`,
    },
    { name: 'markerStart', type: 'string | EdgeMarker' },
    { name: 'markerEnd', type: 'string | EdgeMarker' },
    { name: 'zIndex?', type: 'number' },
    { name: 'interactionWidth', type: 'number' },
    { name: 'ariaLabel', type: 'string' },
    { name: 'label?', type: 'string | React.ReactNode' },
    { name: 'labelStyle?', type: 'React.CSSProperties' },
    { name: 'labelShowBg?', type: 'boolean' },
    { name: 'labelBgStyle?', type: 'React.CSSProperties' },
    { name: 'labelBgPadding?', type: '[number, number]' },
    { name: 'labelBgBorderRadius?', type: 'number' },
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
