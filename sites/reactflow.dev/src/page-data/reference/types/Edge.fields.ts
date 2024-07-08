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
    { name: 'selectable', type: 'boolean' },
    { name: 'deletable', type: 'boolean' },
    { name: 'focusable', type: 'boolean' },
    {
      name: 'reconnectable?',
      type: 'boolean | "source" | "target"',
      description: 'deprecated: Please use reconnectable',
    },
    {
      name: 'reconnectable?',
      type: 'boolean | "source" | "target"',
      description: `Determines whether the edge can be updated by dragging the
      source or target to a new node. This property will override the default
      set by the edgesReconnectable prop on the <ReactFlow /> component.`,
    },
    { name: 'markerStart', type: 'string | EdgeMarker' },
    { name: 'markerEnd', type: 'string | EdgeMarker' },
    { name: 'zIndex?', type: 'number' },
    {
      name: 'interactionWidth',
      type: 'number',
      description: `ReactFlow renders an invisible path around each edge to make
      them easier to click or tap on. This property sets the width of that
      invisible path.`,
    },
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
