import { type PropsTableProps } from '@/components/props-table';
import * as Types from './types/_meta.json';

const links = {
  // Local links
  ProOptions: '#prooptions',
  OnConnectStartParams: '#onconnectstartparams',
  OnSelectionChangeParams: '#onselectionchangeparams',
};

export const commonProps: PropsTableProps = {
  props: [
    ['nodes', 'Node[]', '[]'],
    ['edges', 'Edge[]', '[]'],
    ['defaultNodes', 'Node[]', '[]'],
    ['defaultEdges', 'Edge[]', '[]'],
    ['onNodesChange', '(changes: NodeChange[]) => void'],
    ['onEdgesChange', '(changes: EdgeChange[]) => void'],
    ['onConnect', '(connection: Connection) => void', '-'],
    ['nodeTypes', 'Record<String, React.ComponentType<NodeProps>>'],
    ['edgeTypes', 'Record<String, React.ComponentType<EdgeProps>>'],
    ['nodeOrigin', '[number, number]', '[0,0]'],
    ['style', 'React.CSSProperties'],
    ['className', 'string'],
    ['proOptions', 'ProOptions'],
  ],
  links: links,
  info: {
    nodes: 'The nodes to render in a controlled flow.',
    defaultNodes: 'The initial nodes to render in an uncontrolled flow.',
    onNodesChange:
      'blah blah blah this is a really long line of text and a very detailed description wow I learned so much by reading this.',
  },
};

export const viewportProps: PropsTableProps = {
  props: [
    ['fitView', 'boolean', 'false'],
    ['fitViewOptions', 'FitViewOptions', '-'],
    ['minZoom', 'number', '0.5'],
    ['maxZoom', 'number', '2'],
    ['defaultViewport', 'Viewport', '{ x: 0, y: 0, zoom: 1 }'],
    ['snapGrid', '[number, number]', '[25,25]'],
    ['snapToGrid', 'boolean', 'false'],
    ['onlyRenderVisibleElements', 'boolean', 'false'],
    ['translateExtent', 'CoordinateExtent', '[[-∞,-∞], [+∞,+∞]]'],
    ['nodeExtent', 'CoordinateExtent', '[[-∞,-∞], [+∞,+∞]]'],
    ['preventScrolling', 'boolean', 'true'],
    ['attributionPosition', 'PanelPosition', '"bottom-right"'],
  ],
  links: links,
};

export const edgeProps: PropsTableProps = {
  props: [
    ['elevateEdgesOnSelect', 'boolean', 'false'],
    ['defaultMarkerColor', 'string', '"#b1b1b7"'],
    ['defaultEdgeOoptions', 'DefaultEdgeOptions'],
    ['edgeUpdaterRadius', 'number', '10'],
    ['edgesUpdatable', 'boolean', 'true'],
  ],
  links: links,
};

export const eventHandlerProps: PropsTableProps = {
  props: [
    ['General'],
    ['onInit', '(instance: ReactFlowInstance) => void'],
    ['onError', '(code: string, message: string => void'],

    ['Nodes'],
    ['onNodeClick', '(event: React.MouseEvent, node: Node) => void'],
    ['onNodeDoubleClick', '(event: React.MouseEvent, node: Node) => void'],
    [
      'onNodeDragStart',
      '(event: React.MouseEvent, node: Node, nodes: Node[]) => void',
    ],
    [
      'onNodeDrag',
      '(event: React.MouseEvent, node: Node, nodes: Node[]) => void',
    ],
    [
      'onNodeDragStop',
      '(event: React.MouseEvent, node: Node, nodes: Node[]) => void',
    ],
    ['onNodeMouseEnter', '(event: React.MouseEvent, node: Node) => void'],
    ['onNodeMouseMove', '(event: React.MouseEvent, node: Node) => void'],
    ['onNodeMouseLeave', '(event: React.MouseEvent, node: Node) => void'],
    ['onNodeContextMenu', '(event: React.MouseEvent, node: Node) => void'],
    ['onNodesDelete', '(nodes: Node[]) => void'],
    ['onNodesChange', '(changes: NodeChange[]) => void'],

    ['Edges'],
    ['onEdgeClick', '(event: React.MouseEvent, edge: Edge) => void'],
    ['onEdgeDoubleClick', '(event: React.MouseEvent, edge: Edge) => void'],
    ['onEdgeMouseEnter', '(event: React.MouseEvent, edge: Edge) => void'],
    ['onEdgeMouseMove', '(event: React.MouseEvent, edge: Edge) => void'],
    ['onEdgeMouseLeave', '(event: React.MouseEvent, edge: Edge) => void'],
    ['onEdgeContextMenu', '(event: React.MouseEvent, edge: Edge) => void'],
    ['onEdgeUpdate', '(oldEdge: Edge, newConnection: Connection) => void'],
    [
      'onEdgeUpdateStart',
      '(event: React.MouseEvent, edge: Edge, handleType: HandleType) => void',
    ],
    [
      'onEdgeUpdateEnd',
      '(event: React.MouseEvent, edge: Edge, handleType: HandleType) => void',
    ],
    ['onEdgesDelete', '(edges: Edge[]) => void'],
    ['onEdgesChange', '(changes: EdgeChange[]) => void'],

    ['Connections'],
    ['onConnect', '(connection: Connection) => void'],
    [
      'onConnectStart',
      '(event: React.MouseEvent, params: OnConnectStartParams) => void',
    ],
    ['onConnetEnd', '(event: React.MouseEvent) => void'],
    [
      'onClickConnectStart',
      '(event: React.MouseEvent, params: OnConnectStartParams) => void',
    ],
    ['onClickConnectEnd', '(event: React.MouseEvent) => void'],
    ['isValidConnection', '(edge: Edge) => boolean'],

    ['Pane'],
    ['onMove', '(event: React.MouseEvent, data: Viewport) => void'],
    ['onMoveStart', '(event: React.MouseEvent, data: Viewport) => void'],
    ['onMoveEnd', '(event: React.MouseEvent, data: Viewport) => void'],
    ['onPaneClick', '(event: React.MouseEvent) => void'],
    ['onPaneContextMenu', '(event: React.MouseEvent) => void'],
    ['onPaneScroll', '(event: React.MouseEvent) => void'],
    ['onPaneMouseMove', '(event: React.MouseEvent) => void'],
    ['onPaneMouseEnter', '(event: React.MouseEvent) => void'],
    ['onPaneMouseLeave', '(event: React.MouseEvent) => void'],

    ['Selections'],
    ['onSelectionChange', '(params: OnSelectionChangeParams) => void'],
    [
      'onSelectionDragStart',
      '(event: React.MouseEvent, nodes: Node[]) => void',
    ],
    ['onSelectionDrag', '(event: React.MouseEvent, nodes: Node[]) => void'],
    ['onSelectionDragStop', '(event: React.MouseEvent, nodes: Node[]) => void'],
    ['onSelectionStart', '() => void'],
    ['onSelectionEnd', '() => void'],
  ],
  links: links,
};

export const interactionProps: PropsTableProps = {
  props: [
    ['nodesDraggable', 'boolean', 'true'],
    ['nodesConnectable', 'boolean', 'true'],
    ['nodesFocusable', 'boolean', 'true'],
    ['edgesFocusable', 'boolean', 'true'],
    ['elementsSelectable', 'boolean', 'true'],
    ['autoPanOnConnect', 'boolean', 'true'],
    ['autoPanOnNodeDrag', 'boolean', 'true'],
    ['panOnDrag', 'boolean | number[]', 'true'],
    ['selectionOnDrag', 'boolean', 'false'],
    ['selectionMode', '"partial" | "full"', '"full"'],
    ['panOnScroll', 'boolean', 'false'],
    ['panOnScrollSpeed', 'number'],
    ['panOnScrollMode', '"free" | "horizontal" | "vertical"', '"free"'],
    ['zoomOnScroll', 'boolean', 'true'],
    ['zoomOnPinch', 'boolean', 'true'],
    ['zoomOnDoubleClick', 'boolean', 'true'],
    ['selectNodesOnDrag', 'boolean', 'true'],
    ['elevateNodesOnSelect', 'boolean', 'true'],
    ['connectOnClick', 'boolean', 'true'],
    ['connectionMode', '"loose" | "strict"', '"strict"'],
    ['disabledKeyboardA11y', 'boolean', 'false'],
  ],
  links: links,
};

export const connectionLineProps: PropsTableProps = {
  props: [
    ['connectionRadius', 'number', '20'],
    ['connectionLineType', 'ConnectionLineType', 'ConnectionLineType.Bezier'],
    ['connectionLineStyle', 'React.CSSProperties'],
    [
      'connectionLineComponent',
      'React.ComponentType<ConnectionLineComponentProps>',
    ],
    ['connectionLineWrapperStyles', 'React.CSSProperties'],
  ],
  links: links,
};

export const keyboardProps: PropsTableProps = {
  props: [
    ['deleteKeyCode', 'string | string[] | null', '"Backspace"'],
    ['selectionKeyCode', 'string | string[] | null', '"Shift"'],
    ['multiSelectionKeyCode', 'string | string[] | null', '"Meta"'],
    ['zoomActivationKeyCode', 'string | string[] | null', '"Meta"'],
    ['panActivationKeyCode', 'string | string[] | null', '"Space"'],
  ],
  links: links,
};
