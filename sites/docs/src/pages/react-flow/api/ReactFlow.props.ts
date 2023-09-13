import { type PropsTableProps } from '@/components/props-table';

const links = {
  ProOptions: '#prooptions',
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
      description:
        'Use this event handler to add interactivity to a controlled flow. It is called on node drag, select, and move.',
    },
    {
      name: 'onEdgesChange',
      type: '(changes: EdgeChange[]) => void',
      description:
        'Use this event handler to add interactivity to a controlled flow. It is called on edge select and remove.',
    },
    {
      name: 'onConnect',
      type: '(connection: Connection) => void',
      default: '-',
    },
    {
      name: 'nodeTypes',
      type: 'Record<String, React.ComponentType<NodeProps>>',
    },
    {
      name: 'edgeTypes',
      type: 'Record<String, React.ComponentType<EdgeProps>>',
    },
    { name: 'nodeOrigin', type: '[number, number]', default: '[0,0]' },
    { name: 'style', type: 'React.CSSProperties' },
    { name: 'className', type: 'string' },
    { name: 'proOptions', type: 'ProOptions' },
  ],
  links: links,
};

export const viewportProps: PropsTableProps = {
  props: [
    { name: 'fitView', type: 'boolean', default: 'false' },
    { name: 'fitViewOptions', type: 'FitViewOptions', default: '-' },
    { name: 'minZoom', type: 'number', default: '0.5' },
    { name: 'maxZoom', type: 'number', default: '2' },
    {
      name: 'defaultViewport',
      type: 'Viewport',
      default: '{ x: 0, y: 0, zoom: 1 }',
    },
    { name: 'snapGrid', type: '[number, number]', default: '[25,25]' },
    { name: 'snapToGrid', type: 'boolean', default: 'false' },
    { name: 'onlyRenderVisibleElements', type: 'boolean', default: 'false' },
    {
      name: 'translateExtent',
      type: 'CoordinateExtent',
      default: '[[-∞,-∞], [+∞,+∞]]',
    },
    {
      name: 'nodeExtent',
      type: 'CoordinateExtent',
      default: '[[-∞,-∞], [+∞,+∞]]',
    },
    { name: 'preventScrolling', type: 'boolean', default: 'true' },
    {
      name: 'attributionPosition',
      type: 'PanelPosition',
      default: '"bottom-right"',
    },
  ],
  links: links,
};

export const edgeProps: PropsTableProps = {
  props: [
    { name: 'elevateEdgesOnSelect', type: 'boolean', default: 'false' },
    { name: 'defaultMarkerColor', type: 'string', default: '"#b1b1b7"' },
    { name: 'defaultEdgeOoptions', type: 'DefaultEdgeOptions' },
    { name: 'edgeUpdaterRadius', type: 'number', default: '10' },
    { name: 'edgesUpdatable', type: 'boolean', default: 'true' },
  ],
  links: links,
};

export const eventHandlerProps: PropsTableProps = {
  props: [
    { name: 'General' },
    { name: 'onInit', type: '(instance: ReactFlowInstance) => void' },
    { name: 'onError', type: '(code: string, message: string => void' },

    { name: 'Nodes' },
    {
      name: 'onNodeClick',
      type: '(event: React.MouseEvent, node: Node) => void',
    },
    {
      name: 'onNodeDoubleClick',
      type: '(event: React.MouseEvent, node: Node) => void',
    },
    {
      name: 'onNodeDragStart',
      type: '(event: React.MouseEvent, node: Node, nodes: Node[]) => void',
    },
    {
      name: 'onNodeDrag',
      type: '(event: React.MouseEvent, node: Node, nodes: Node[]) => void',
    },
    {
      name: 'onNodeDragStop',
      type: '(event: React.MouseEvent, node: Node, nodes: Node[]) => void',
    },
    {
      name: 'onNodeMouseEnter',
      type: '(event: React.MouseEvent, node: Node) => void',
    },
    {
      name: 'onNodeMouseMove',
      type: '(event: React.MouseEvent, node: Node) => void',
    },
    {
      name: 'onNodeMouseLeave',
      type: '(event: React.MouseEvent, node: Node) => void',
    },
    {
      name: 'onNodeContextMenu',
      type: '(event: React.MouseEvent, node: Node) => void',
    },
    { name: 'onNodesDelete', type: '(nodes: Node[]) => void' },
    { name: 'onNodesChange', type: '(changes: NodeChange[]) => void' },

    { name: 'Edges' },
    {
      name: 'onEdgeClick',
      type: '(event: React.MouseEvent, edge: Edge) => void',
    },
    {
      name: 'onEdgeDoubleClick',
      type: '(event: React.MouseEvent, edge: Edge) => void',
    },
    {
      name: 'onEdgeMouseEnter',
      type: '(event: React.MouseEvent, edge: Edge) => void',
    },
    {
      name: 'onEdgeMouseMove',
      type: '(event: React.MouseEvent, edge: Edge) => void',
    },
    {
      name: 'onEdgeMouseLeave',
      type: '(event: React.MouseEvent, edge: Edge) => void',
    },
    {
      name: 'onEdgeContextMenu',
      type: '(event: React.MouseEvent, edge: Edge) => void',
    },
    {
      name: 'onEdgeUpdate',
      type: '(oldEdge: Edge, newConnection: Connection) => void',
    },
    {
      name: 'onEdgeUpdateStart',
      type: '(event: React.MouseEvent, edge: Edge, handleType: "source" | "target") => void',
    },
    {
      name: 'onEdgeUpdateEnd',
      type: '(event: React.MouseEvent, edge: Edge, handleType: "source" | "target") => void',
    },
    { name: 'onEdgesDelete', type: '(edges: Edge[]) => void' },
    { name: 'onEdgesChange', type: '(changes: EdgeChange[]) => void' },

    { name: 'Connections' },
    { name: 'onConnect', type: '(connection: Connection) => void' },
    {
      name: 'onConnectStart',
      type: '(event: React.MouseEvent, params: { nodeId: string | null; handleId: string | null; handleType: HandleType | null; }) => void',
    },
    { name: 'onConnetEnd', type: '(event: React.MouseEvent) => void' },
    {
      name: 'onClickConnectStart',
      type: '(event: React.MouseEvent, params: { nodeId: string | null; handleId: string | null; handleType: HandleType | null; }) => void',
    },
    { name: 'onClickConnectEnd', type: '(event: React.MouseEvent) => void' },
    { name: 'isValidConnection', type: '(edge: Edge) => boolean' },

    { name: 'Pane' },
    {
      name: 'onMove',
      type: '(event: React.MouseEvent, data: Viewport) => void',
    },
    {
      name: 'onMoveStart',
      type: '(event: React.MouseEvent, data: Viewport) => void',
    },
    {
      name: 'onMoveEnd',
      type: '(event: React.MouseEvent, data: Viewport) => void',
    },
    { name: 'onPaneClick', type: '(event: React.MouseEvent) => void' },
    { name: 'onPaneContextMenu', type: '(event: React.MouseEvent) => void' },
    { name: 'onPaneScroll', type: '(event: React.MouseEvent) => void' },
    { name: 'onPaneMouseMove', type: '(event: React.MouseEvent) => void' },
    { name: 'onPaneMouseEnter', type: '(event: React.MouseEvent) => void' },
    { name: 'onPaneMouseLeave', type: '(event: React.MouseEvent) => void' },

    { name: 'Selections' },
    {
      name: 'onSelectionChange',
      type: '(params: { nodes: Node[]; edges: Edge[]; }) => void',
    },
    {
      name: 'onSelectionDragStart',
      type: '(event: React.MouseEvent, nodes: Node[]) => void',
    },
    {
      name: 'onSelectionDrag',
      type: '(event: React.MouseEvent, nodes: Node[]) => void',
    },
    {
      name: 'onSelectionDragStop',
      type: '(event: React.MouseEvent, nodes: Node[]) => void',
    },
    { name: 'onSelectionStart', type: '() => void' },
    { name: 'onSelectionEnd', type: '() => void' },
  ],
  links: links,
};

export const interactionProps: PropsTableProps = {
  props: [
    { name: 'nodesDraggable', type: 'boolean', default: 'true' },
    { name: 'nodesConnectable', type: 'boolean', default: 'true' },
    { name: 'nodesFocusable', type: 'boolean', default: 'true' },
    { name: 'edgesFocusable', type: 'boolean', default: 'true' },
    { name: 'elementsSelectable', type: 'boolean', default: 'true' },
    { name: 'autoPanOnConnect', type: 'boolean', default: 'true' },
    { name: 'autoPanOnNodeDrag', type: 'boolean', default: 'true' },
    { name: 'panOnDrag', type: 'boolean | number[]', default: 'true' },
    { name: 'selectionOnDrag', type: 'boolean', default: 'false' },
    { name: 'selectionMode', type: '"partial" | "full"', default: '"full"' },
    { name: 'panOnScroll', type: 'boolean', default: 'false' },
    { name: 'panOnScrollSpeed', type: 'number' },
    {
      name: 'panOnScrollMode',
      type: '"free" | "horizontal" | "vertical"',
      default: '"free"',
    },
    { name: 'zoomOnScroll', type: 'boolean', default: 'true' },
    { name: 'zoomOnPinch', type: 'boolean', default: 'true' },
    { name: 'zoomOnDoubleClick', type: 'boolean', default: 'true' },
    { name: 'selectNodesOnDrag', type: 'boolean', default: 'true' },
    { name: 'elevateNodesOnSelect', type: 'boolean', default: 'true' },
    { name: 'connectOnClick', type: 'boolean', default: 'true' },
    { name: 'connectionMode', type: '"loose" | "strict"', default: '"strict"' },
    { name: 'disabledKeyboardA11y', type: 'boolean', default: 'false' },
  ],
  links: links,
};

export const connectionLineProps: PropsTableProps = {
  props: [
    { name: 'connectionRadius', type: 'number', default: '20' },
    {
      name: 'connectionLineType',
      type: 'ConnectionLineType',
      default: 'ConnectionLineType.Bezier',
    },
    { name: 'connectionLineStyle', type: 'React.CSSProperties' },
    {
      name: 'connectionLineComponent',
      type: 'React.ComponentType<ConnectionLineComponentProps>',
    },
    { name: 'connectionLineWrapperStyles', type: 'React.CSSProperties' },
  ],
  links: links,
};

export const keyboardProps: PropsTableProps = {
  props: [
    {
      name: 'deleteKeyCode',
      type: 'string | string[] | null',
      default: '"Backspace"',
    },
    {
      name: 'selectionKeyCode',
      type: 'string | string[] | null',
      default: '"Shift"',
    },
    {
      name: 'multiSelectionKeyCode',
      type: 'string | string[] | null',
      default: '"Meta"',
    },
    {
      name: 'zoomActivationKeyCode',
      type: 'string | string[] | null',
      default: '"Meta"',
    },
    {
      name: 'panActivationKeyCode',
      type: 'string | string[] | null',
      default: '"Space"',
    },
  ],
  links: links,
};
