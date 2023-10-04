import { type PropsTableProps } from '@/components/props-table';

const links = {
  ProOptions: '#prooptions',
};

export const commonProps: PropsTableProps = {
  deeplinkPrefix: 'common',
  props: [
    {
      name: 'nodes?',
      type: 'Node[]',
      default: '[]',
      description: 'An array of nodes to render in a controlled flow.',
    },
    {
      name: 'edges?',
      type: 'Edge[]',
      default: '[]',
      description: 'An array of edges to render in a controlled flow.',
    },
    {
      name: 'defaultNodes?',
      type: 'Node[]',
      default: '[]',
      description: 'The initial nodes to render in an uncontrolled flow.',
    },
    {
      name: 'defaultEdges?',
      type: 'Edge[]',
      default: '[]',
      description: 'The initial edges to render in an uncontrolled flow.',
    },
    {
      name: 'onNodesChange?',
      type: '(changes: NodeChange[]) => void',
      description: `Use this event handler to add interactivity to a controlled
      flow. It is called on node drag, select, and move.`,
    },
    {
      name: 'onEdgesChange?',
      type: '(changes: EdgeChange[]) => void',
      description: `Use this event handler to add interactivity to a controlled
      flow. It is called on edge select and remove.`,
    },
    {
      name: 'onConnect?',
      type: '(connection: Connection) => void',
      description: `When a connection line is completed and two nodes are connected
      by the user, this event fires with the new connection. You can use the
      addEdge utility to convert the connection to a complete edge.`,
    },
    {
      name: 'nodeTypes?',
      type: 'Record<String, React.ComponentType<NodeProps>>',
      description: `If you want to use custom nodes in your flow, you need to let
      React Flow know about them. When rendering a new node, React Flow will look
      up that node's type in this object and render the corresponding component.`,
    },
    {
      name: 'edgeTypes?',
      type: 'Record<String, React.ComponentType<EdgeProps>>',
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
    { name: 'style?', type: 'React.CSSProperties' },
    { name: 'className?', type: 'string' },
    {
      name: 'proOptions?',
      type: 'ProOptions',
      description: `Our pro options are configuration settings intended for our
      Pro subscribers. Anyone is free to use them, though!`,
    },
  ],
  links: links,
};

export const viewportProps: PropsTableProps = {
  deeplinkPrefix: 'viewport',
  props: [
    {
      name: 'defaultViewport?',
      type: 'Viewport',
      default: '{ x: 0, y: 0, zoom: 1 }',
      description: `Sets the initial position and zoom of the viewport. If a
      default viewport is provided but fitView is enabled, the default viewport
      will be ignored.`,
    },
    {
      name: 'viewport?',
      type: 'Viewport',
      default: '{ x: 0, y: 0, zoom: 1 }',
      description: `When you pass a viewport prop, it's controlled and you also need to pass onViewportChange to handle internal changes.`,
    },
    {
      name: 'OnViewportChange?',
      type: 'OnViewportChange',
      default: '-',
      description: `Used when working with a controlled viewport for updating the user viewport state.`,
    },
    {
      name: 'fitView?',
      type: 'boolean',
      default: 'false',
      description: `When true, the flow will be zoomed and panned to fit all the
      nodes initially provided.`,
    },
    {
      name: 'fitViewOptions?',
      type: 'FitViewOptions',
      description: `When you typically call fitView on a ReactFlowInstance, you
      can provide an object of options to customize its behaviour. This prop lets
      you do the same for the initial fitView call.`,
    },
    { name: 'minZoom?', type: 'number', default: '0.5' },
    { name: 'maxZoom?', type: 'number', default: '2' },
    {
      name: 'snapToGrid?',
      type: 'boolean',
      default: 'false',
      description: `When enabled, nodes will snap to the grid when dragged.`,
    },
    {
      name: 'snapGrid?',
      type: '[number, number]',
      default: '[25,25]',
      description: `If snapToGrid is enabled, this prop configures the grid that
      nodes will snap to.`,
    },
    {
      name: 'onlyRenderVisibleElements?',
      type: 'boolean',
      default: 'false',
      description: `You can enable this optimisation to instruct React Flow to
      only render nodes and edges that would be visible in the viewport.`,
    },
    {
      name: 'translateExtent?',
      type: 'CoordinateExtent',
      default: '[[-∞,-∞], [+∞,+∞]]',
      description: `By default the viewport extends infinitely. You can use this
      prop to set a boundary. The first pair of coordinates is the top left
      boundary and the second pair is the bottom right..`,
    },
    {
      name: 'nodeExtent?',
      type: 'CoordinateExtent',
      default: '[[-∞,-∞], [+∞,+∞]]',
      description: `As with translateExtent, this prop lets you set a boundary
      for governing where nodes can be placed. `,
    },
    {
      name: 'preventScrolling?',
      type: 'boolean',
      default: 'true',
      description: `Disabling this prop will allow the user to scroll the page
      even when their pointer is over the flow.`,
    },
    {
      name: 'attributionPosition?',
      type: 'PanelPosition',
      default: '"bottom-right"',
      description: `By default, React Flow will render a small attribution in
      the bottom right corner of the flow. You can use this prop to change its
      position in case you want to place something else there.`,
    },
  ],
  links: links,
};

export const edgeProps: PropsTableProps = {
  deeplinkPrefix: 'edge',
  props: [
    {
      name: 'elevateEdgesOnSelect?',
      type: 'boolean',
      default: 'false',
      description: `Enabling this option will raise the z-index of edges connected
      to a node when selected.`,
    },
    { name: 'defaultMarkerColor?', type: 'string', default: '"#b1b1b7"' },
    {
      name: 'defaultEdgeOoptions?',
      type: 'DefaultEdgeOptions',
      description: `Any defaults set here will be applied to all new edges that
      are added to the flow. Properties on a new edge will override these defaults
      if they exist.`,
    },
    {
      name: 'edgeUpdaterRadius?',
      type: 'number',
      default: '10',
      description: `The radius around an edge connection that can trigger an edge
      update.`,
    },
    {
      name: 'edgesUpdatable?',
      type: 'boolean',
      default: 'true',
      description: `Whether or not edges can be updated once they are created.
      This allows users to drag the source or target handles of an edge to a new
      node.`,
    },
  ],
  links: links,
};

export const eventHandlerProps: PropsTableProps = {
  deeplinkPrefix: 'event',
  props: [
    { name: 'General' },
    {
      name: 'onInit?',
      type: '(instance: ReactFlowInstance) => void',
      description: `The onInit callback is called when the viewport is initialized.
      At this point you can use the instance to call methods like fitView or zoomTo.`,
    },
    {
      name: 'onError?',
      type: '(code: string, message: string => void',
      description: `Ocassionally something may happen that causes React Flow to
      error. Instead of exploding your application, we log a message to the console
      and then call this event handler. You might use it for additional logging
      or to show a message to the user.`,
    },
    { name: 'Nodes' },
    {
      name: 'onNodeClick?',
      type: '(event: React.MouseEvent, node: Node) => void',
    },
    {
      name: 'onNodeDoubleClick?',
      type: '(event: React.MouseEvent, node: Node) => void',
    },
    {
      name: 'onNodeDragStart?',
      type: '(event: React.MouseEvent, node: Node, nodes: Node[]) => void',
    },
    {
      name: 'onNodeDrag?',
      type: '(event: React.MouseEvent, node: Node, nodes: Node[]) => void',
    },
    {
      name: 'onNodeDragStop?',
      type: '(event: React.MouseEvent, node: Node, nodes: Node[]) => void',
    },
    {
      name: 'onNodeMouseEnter?',
      type: '(event: React.MouseEvent, node: Node) => void',
    },
    {
      name: 'onNodeMouseMove?',
      type: '(event: React.MouseEvent, node: Node) => void',
    },
    {
      name: 'onNodeMouseLeave?',
      type: '(event: React.MouseEvent, node: Node) => void',
    },
    {
      name: 'onNodeContextMenu?',
      type: '(event: React.MouseEvent, node: Node) => void',
    },
    { name: 'onNodesDelete?', type: '(nodes: Node[]) => void' },
    {
      name: 'onNodesChange?',
      type: '(changes: NodeChange[]) => void',
      description: `Use this event handler to add interactivity to a controlled
      flow. It is called on node drag, select, and move.`,
    },

    { name: 'Edges' },
    {
      name: 'onEdgeClick?',
      type: '(event: React.MouseEvent, edge: Edge) => void',
    },
    {
      name: 'onEdgeDoubleClick?',
      type: '(event: React.MouseEvent, edge: Edge) => void',
    },
    {
      name: 'onEdgeMouseEnter?',
      type: '(event: React.MouseEvent, edge: Edge) => void',
    },
    {
      name: 'onEdgeMouseMove?',
      type: '(event: React.MouseEvent, edge: Edge) => void',
    },
    {
      name: 'onEdgeMouseLeave?',
      type: '(event: React.MouseEvent, edge: Edge) => void',
    },
    {
      name: 'onEdgeContextMenu?',
      type: '(event: React.MouseEvent, edge: Edge) => void',
    },
    {
      name: 'onEdgeUpdate?',
      type: '(oldEdge: Edge, newConnection: Connection) => void',
    },
    {
      name: 'onEdgeUpdateStart?',
      type: '(event: React.MouseEvent, edge: Edge, handleType: "source" | "target") => void',
    },
    {
      name: 'onEdgeUpdateEnd?',
      type: '(event: React.MouseEvent, edge: Edge, handleType: "source" | "target") => void',
    },
    { name: 'onEdgesDelete?', type: '(edges: Edge[]) => void' },
    {
      name: 'onEdgesChange?',
      type: '(changes: EdgeChange[]) => void',
      description: `Use this event handler to add interactivity to a controlled
      flow. It is called on edge select and remove.`,
    },
    { name: 'Connections' },
    {
      name: 'onConnect?',
      type: '(connection: Connection) => void',
      description: `When a connection line is completed and two nodes are connected
      by the user, this event fires with the new connection. You can use the
      addEdge utility to convert the connection to a complete edge.`,
    },
    {
      name: 'onConnectStart?',
      type: '(event: React.MouseEvent, params: { nodeId: string | null; handleId: string | null; handleType: HandleType | null; }) => void',
    },
    { name: 'onConnetEnd?', type: '(event: React.MouseEvent) => void' },
    {
      name: 'onClickConnectStart?',
      type: '(event: React.MouseEvent, params: { nodeId: string | null; handleId: string | null; handleType: HandleType | null; }) => void',
    },
    { name: 'onClickConnectEnd?', type: '(event: React.MouseEvent) => void' },
    {
      name: 'isValidConnection?',
      type: '(edge: Edge) => boolean',
      description: `This callback can be used to validate a new connection. If
      you return false, the edge will not be added to your flow. If you have custom
      connection logic its preferred to use this callback over the isValidConnection
      prop on the handle component for performance reasons.`,
    },
    { name: 'Pane' },
    {
      name: 'onMove?',
      type: '(event: React.MouseEvent, data: Viewport) => void',
      description: `This event handler is called while the user is either panning
      or zooming the viewport.`,
    },
    {
      name: 'onMoveStart?',
      type: '(event: React.MouseEvent, data: Viewport) => void',
      description: `This event handler is called when the user begins to pan or
      zoom the viewport.`,
    },
    {
      name: 'onMoveEnd?',
      type: '(event: React.MouseEvent, data: Viewport) => void',
      description: `This event handler is called while the user stops either
      panning or zooming the viewport.`,
    },
    { name: 'onPaneClick?', type: '(event: React.MouseEvent) => void' },
    { name: 'onPaneContextMenu?', type: '(event: React.MouseEvent) => void' },
    { name: 'onPaneScroll?', type: '(event: React.MouseEvent) => void' },
    { name: 'onPaneMouseMove?', type: '(event: React.MouseEvent) => void' },
    { name: 'onPaneMouseEnter?', type: '(event: React.MouseEvent) => void' },
    { name: 'onPaneMouseLeave?', type: '(event: React.MouseEvent) => void' },

    { name: 'Selections' },
    {
      name: 'onSelectionChange?',
      type: '(params: { nodes: Node[]; edges: Edge[]; }) => void',
      description: ``,
    },
    {
      name: 'onSelectionDragStart?',
      type: '(event: React.MouseEvent, nodes: Node[]) => void',
    },
    {
      name: 'onSelectionDrag?',
      type: '(event: React.MouseEvent, nodes: Node[]) => void',
    },
    {
      name: 'onSelectionDragStop?',
      type: '(event: React.MouseEvent, nodes: Node[]) => void',
    },
    { name: 'onSelectionStart?', type: '() => void' },
    { name: 'onSelectionEnd?', type: '() => void' },
  ],
  links: links,
};

export const interactionProps: PropsTableProps = {
  deeplinkPrefix: 'interaction',
  props: [
    {
      name: 'nodesDraggable?',
      type: 'boolean',
      default: 'true',
      description: `Controls whether all nodes should be draggable or not. Individual
      nodes can override this setting by setting their draggable prop. If you want
      to use the mouse handlers on non-draggable nodes, you need to add the "nopan"
      class to those nodes.`,
    },
    {
      name: 'nodesConnectable?',
      type: 'boolean',
      default: 'true',
      description: `Controls whether all nodes should be connectable or not. Individual
      nodes can override this setting by setting their connectable prop.`,
    },
    {
      name: 'nodesFocusable?',
      type: 'boolean',
      default: 'true',
      description: `When true, focus between nodes can be cycled with the Tab key
      and selected with the Enter key. This option can be overriden by individual
      nodes by setting their focusable prop.`,
    },
    {
      name: 'edgesFocusable?',
      type: 'boolean',
      default: 'true',
    },
    { name: 'elementsSelectable?', type: 'boolean', default: 'true' },
    { name: 'autoPanOnConnect?', type: 'boolean', default: 'true' },
    { name: 'autoPanOnNodeDrag?', type: 'boolean', default: 'true' },
    {
      name: 'panOnDrag?',
      type: 'boolean | (0 | 1 | 2 | 3 | 4)[]',
      default: 'true',
      description: `Enableing this prop allows users to pan the viewport by clicking
      and dragging. You can also set this prop to an array of numbers to limit
      which mouse buttons can activate panning. For example, [0,2] would allow
      panning with the left and right mouse buttons.`,
    },
    { name: 'selectionOnDrag?', type: 'boolean', default: 'false' },
    {
      name: 'selectionMode?',
      type: '"partial" | "full"',
      default: '"full"',
      description: `When set to "partial", when the user creates a selection box
      by click and dragging nodes that are only partially in the box are still
      selected.`,
    },
    { name: 'panOnScroll?', type: 'boolean', default: 'false' },
    { name: 'panOnScrollSpeed?', type: 'number' },
    {
      name: 'panOnScrollMode?',
      type: '"free" | "horizontal" | "vertical"',
      default: '"free"',
      description: `This prop is used to limit the direction of panning when
      panOnScroll is enabled. The "free" option allows panning in any direction.`,
    },
    { name: 'zoomOnScroll?', type: 'boolean', default: 'true' },
    { name: 'zoomOnPinch?', type: 'boolean', default: 'true' },
    { name: 'zoomOnDoubleClick?', type: 'boolean', default: 'true' },
    { name: 'selectNodesOnDrag?', type: 'boolean', default: 'true' },
    {
      name: 'elevateNodesOnSelect?',
      type: 'boolean',
      default: 'true',
      description: `Enabling this option will raise the z-index of nodes when
      they are selected.`,
    },
    {
      name: 'connectOnClick?',
      type: 'boolean',
      default: 'true',
      description: `The connectOnClick option lets you click or tap on a source
      handle to start a connection and then click on a target handle to complete
      the connection. If you set this option to false, users will need to drag
      the connection line to the target handle to create a connection.`,
    },
    {
      name: 'connectionMode?',
      type: '"loose" | "strict"',
      default: '"strict"',
      description: `A loose connection mode will allow you to connect handles of
      any type to one another. The strict mode will only allow you to connect
      source handles to target handles.`,
    },
    {
      name: 'disabledKeyboardA11y?',
      type: 'boolean',
      default: 'false',
      description: `You can use this prop to disable keyboard accessibility fetures
      such as moving selected nodes with the arrow keys.`,
    },
  ],
  links: links,
};

export const connectionLineProps: PropsTableProps = {
  deeplinkPrefix: 'connection',
  props: [
    {
      name: 'connectionRadius?',
      type: 'number',
      default: '20',
      description: `The radius around a handle where you drop a connection line
      to create a new edge.`,
    },
    {
      name: 'connectionLineType?',
      type: 'ConnectionLineType',
      default: 'ConnectionLineType.Bezier',
      description: `The type of edge path to use for connection lines. Although
      created edges can be of any type, React Flow needs to know what type of
      path to render for the connection line before the edge is created!`,
    },
    { name: 'connectionLineStyle?', type: 'React.CSSProperties' },
    {
      name: 'connectionLineComponent?',
      type: 'React.ComponentType<ConnectionLineComponentProps>',
    },
    { name: 'connectionLineWrapperStyles?', type: 'React.CSSProperties' },
  ],
  links: links,
};

export const keyboardProps: PropsTableProps = {
  deeplinkPrefix: 'keyboard',
  props: [
    {
      name: 'deleteKeyCode?',
      type: 'string | string[] | null',
      default: '"Backspace"',
    },
    {
      name: 'selectionKeyCode?',
      type: 'string | string[] | null',
      default: '"Shift"',
    },
    {
      name: 'multiSelectionKeyCode?',
      type: 'string | string[] | null',
      default: '"Meta"',
    },
    {
      name: 'zoomActivationKeyCode?',
      type: 'string | string[] | null',
      default: '"Meta"',
      description: `If a key is set, you can zoom the viewport while that key is
      held down even if panOnScroll is set to false. By setting this prop to null
      you can disable this functionality.`,
    },
    {
      name: 'panActivationKeyCode?',
      type: 'string | string[] | null',
      default: '"Space"',
      description: `If a key is set, you can pan the viewport while that key is
      held down even if panOnScroll is set to false. By setting this prop to null
      you can disable this functionality.`,
    },
  ],
  links: links,
};
