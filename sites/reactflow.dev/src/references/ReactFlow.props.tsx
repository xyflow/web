import { type PropsTableProps } from 'xy-shared';
import type { FC } from 'react';
import { useMDXComponents as getMDXComponents } from '@/mdx-components';

const { APIDocs } = getMDXComponents() as unknown as { APIDocs: FC<{ code?: string }> };

const FIELDS = {
  viewport: [
    'defaultViewport',
    'viewport',
    'onViewportChange',
    'fitView',
    'fitViewOptions',
    'minZoom',
    'maxZoom',
    'snapToGrid',
    'snapGrid',
    'onlyRenderVisibleElements',
    'translateExtent',
    'nodeExtent',
    'preventScrolling',
    'attributionPosition',
  ],
  edge: [
    'elevateEdgesOnSelect',
    'defaultMarkerColor',
    'defaultEdgeOptions',
    'reconnectRadius',
    'edgesReconnectable',
  ],
  nodeEvents: [
    'onNodeClick',
    'onNodeDoubleClick',
    'onNodeDragStart',
    'onNodeDrag',
    'onNodeDragStop',
    'onNodeMouseEnter',
    'onNodeMouseMove',
    'onNodeMouseLeave',
    'onNodeContextMenu',
    'onNodesDelete',
    'onNodesChange',
  ],
  selectionEvents: [
    'onSelectionChange',
    'onSelectionDragStart',
    'onSelectionDrag',
    'onSelectionDragStop',
    'onSelectionStart',
    'onSelectionEnd',
    'onSelectionContextMenu',
  ],
  paneEvents: [
    'onMove',
    'onMoveStart',
    'onMoveEnd',
    'onPaneClick',
    'onPaneContextMenu',
    'onPaneScroll',
    'onPaneMouseMove',
    'onPaneMouseEnter',
    'onPaneMouseLeave',
  ],
  style: ['noPanClassName', 'noDragClassName', 'noWheelClassName'],
  generalEvents: ['onInit', 'onError', 'onDelete', 'onBeforeDelete'],
  edgeEvents: [
    'onEdgeClick',
    'onEdgeDoubleClick',
    'onEdgeMouseEnter',
    'onEdgeMouseMove',
    'onEdgeMouseLeave',
    'onEdgeContextMenu',
    'onReconnect',
    'onReconnectStart',
    'onReconnectEnd',
    'onEdgesDelete',
    'onEdgesChange',
  ],
  connectionEvents: [
    'onConnect',
    'onConnectStart',
    'onConnectEnd',
    'onClickConnectStart',
    'onClickConnectEnd',
    'isValidConnection',
  ],
  interaction: [
    'nodesDraggable',
    'nodesConnectable',
    'nodesFocusable',
    'edgesFocusable',
    'elementsSelectable',
    'autoPanOnConnect',
    'autoPanOnNodeDrag',
    'autoPanSpeed',
    'panOnDrag',
    'selectionOnDrag',
    'selectionMode',
    'panOnScroll',
    'panOnScrollSpeed',
    'panOnScrollMode',
    'zoomOnScroll',
    'zoomOnPinch',
    'zoomOnDoubleClick',
    'selectNodesOnDrag',
    'elevateNodesOnSelect',
    'connectOnClick',
    'connectionMode',
  ],
  connectionLine: [
    'connectionRadius',
    'connectionLineType',
    'connectionLineStyle',
    'connectionLineComponent',
    'connectionLineContainerStyle',
  ],
  keyboard: [
    'deleteKeyCode',
    'selectionKeyCode',
    'multiSelectionKeyCode',
    'zoomActivationKeyCode',
    'panActivationKeyCode',
    'disableKeyboardA11y',
  ],
};

export const ReactFlowAPIProps: FC<{ group: keyof typeof FIELDS | 'common' }> = ({
  group,
}) => {
  let myType: string;
  if (group === 'common') {
    const omittedFields = Object.values(FIELDS)
      .flat()
      .map((v) => `"${v}"`)
      .join('|');

    myType = `
type GroupedProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onError'>
      
type $ = Omit<ReactFlowProps, ${omittedFields} | keyof GroupedProps> & {
  '...props': GroupedProps
}`;
  } else {
    const pickedFields = FIELDS[group].map((v) => `"${v}"`).join('|');
    myType = `type $ = Pick<ReactFlowProps, ${pickedFields}>`;
  }

  return (
    <APIDocs
      code={`
import type { ReactFlow } from '@xyflow/react'

type ReactFlowProps = React.ComponentProps<typeof ReactFlow>

${myType}

export default $`}
    />
  );
};

export const commonProps: PropsTableProps = {
  props: [
    {
      name: 'nodes',
      type: 'Node[]',
      default: '[]',
      description: 'An array of nodes to render in a controlled flow.',
    },
    {
      name: 'edges',
      type: 'Edge[]',
      default: '[]',
      description: 'An array of edges to render in a controlled flow.',
    },
    {
      name: 'defaultNodes',
      type: 'Node[]',
      default: '[]',
      description: 'The initial nodes to render in an uncontrolled flow.',
    },
    {
      name: 'defaultEdges',
      type: 'Edge[]',
      default: '[]',
      description: 'The initial edges to render in an uncontrolled flow.',
    },
    {
      name: 'onNodesChange',
      type: '(changes: NodeChange[]) => void',
      description: `Use this event handler to add interactivity to a controlled
      flow. It is called on node drag, select, and move.`,
    },
    {
      name: 'onEdgesChange',
      type: '(changes: EdgeChange[]) => void',
      description: `Use this event handler to add interactivity to a controlled
      flow. It is called on edge select and remove.`,
    },
    {
      name: 'onConnect',
      type: '(connection: Connection) => void',
      description: `When a connection line is completed and two nodes are connected
      by the user, this event fires with the new connection. You can use the
      addEdge utility to convert the connection to a complete edge.`,
    },
    {
      name: 'nodeTypes',
      type: 'Record<String, React.ComponentType<NodeProps>>',
      default: `{
  input: InputNode,
  default: DefaultNode,
  output: OutputNode
  group: GroupNode
}`,
      description: `If you want to use custom nodes in your flow, you need to let
      React Flow know about them. When rendering a new node, React Flow will look
      up that node's type in this object and render the corresponding component.`,
    },
    {
      name: 'edgeTypes',
      type: 'Record<String, React.ComponentType<EdgeProps>>',
      default: `{
  default: BezierEdge,
  straight: StraightEdge,
  step: StepEdge,
  smoothstep: SmoothStepEdge
  simplebezier: SimpleBezier
}`,
      description: `As with node types, this prop lets you use custom edges in
      your flow by mapping edge types to React components.`,
    },
    {
      name: 'nodeOrigin',
      type: '[number, number]',
      default: '[0,0]',
      description: `The origin of the node to use when placing it in the flow
      or looking up its x and y position. An origin of [0,0] means that a node's
      top left corner will be placed at the x and y position.`,
    },
    {
      name: 'nodeDragThreshold',
      type: 'number',
      default: '1',
      description: `
          With a threshold greater than zero you can delay node drag events. If threshold equals 1,
          you need to drag the node 1 pixel before a drag event is fired. 1 is the default values, so
          clicks don't trigger drag events.
        `,
    },
    {
      name: 'nodeClickDistance',
      type: 'number',
      default: `0`,
      description: `The max distance between mousedown/up that will trigger a click.`,
    },
    {
      name: 'paneClickDistance',
      type: 'number',
      default: `0`,
      description: `The max distance between mousedown/up that will trigger a click.`,
    },
    { name: 'style', type: 'React.CSSProperties' },
    { name: 'className', type: 'string' },
    {
      name: 'proOptions',
      type: 'ProOptions',
      description: `Our pro options are configuration settings intended for our
      Pro subscribers. Anyone is free to use them, though!`,
    },
    {
      name: 'colorMode',
      type: '"system" | "light" | "dark"',
      default: '"system"',
      description: `React Flow has 2 built-in color themes: light and dark.
      By default it will try to adopt the users systems color theme.`,
    },
  ],
};
