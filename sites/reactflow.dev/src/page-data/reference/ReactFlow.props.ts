import { type PropsTableProps } from 'xy-shared';

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

export const viewportProps: PropsTableProps = {
  props: [
    {
      name: 'defaultViewport',
      type: 'Viewport',
      default: '{ x: 0, y: 0, zoom: 1 }',
      description: `Sets the initial position and zoom of the viewport. If a
      default viewport is provided but fitView is enabled, the default viewport
      will be ignored.`,
    },
    {
      name: 'viewport',
      type: 'Viewport',
      default: '{ x: 0, y: 0, zoom: 1 }',
      description: `When you pass a viewport prop, it's controlled and you also need to pass onViewportChange to handle internal changes.`,
    },
    {
      name: 'onViewportChange',
      type: '(viewport: Viewport) => void',
      description: `Used when working with a controlled viewport for updating the user viewport state.`,
    },
    {
      name: 'fitView',
      type: 'boolean',
      default: 'false',
      description: `When true, the flow will be zoomed and panned to fit all the
      nodes initially provided.`,
    },
    {
      name: 'fitViewOptions',
      type: 'FitViewOptions',
      description: `When you typically call fitView on a ReactFlowInstance, you
      can provide an object of options to customize its behaviour. This prop lets
      you do the same for the initial fitView call.`,
    },
    { name: 'minZoom', type: 'number', default: '0.5' },
    { name: 'maxZoom', type: 'number', default: '2' },
    {
      name: 'snapToGrid',
      type: 'boolean',
      default: 'false',
      description: `When enabled, nodes will snap to the grid when dragged.`,
    },
    {
      name: 'snapGrid',
      type: '[number, number]',
      default: '[25,25]',
      description: `If snapToGrid is enabled, this prop configures the grid that
      nodes will snap to.`,
    },
    {
      name: 'onlyRenderVisibleElements',
      type: 'boolean',
      default: 'false',
      description: `You can enable this optimisation to instruct React Flow to
      only render nodes and edges that would be visible in the viewport.`,
    },
    {
      name: 'translateExtent',
      type: 'CoordinateExtent',
      default: '[[-∞,-∞], [+∞,+∞]]',
      description: `By default the viewport extends infinitely. You can use this
      prop to set a boundary. The first pair of coordinates is the top left
      boundary and the second pair is the bottom right.`,
    },
    {
      name: 'nodeExtent',
      type: 'CoordinateExtent',
      default: '[[-∞,-∞], [+∞,+∞]]',
      description: `As with translateExtent, this prop lets you set a boundary
      for governing where nodes can be placed.`,
    },
    {
      name: 'preventScrolling',
      type: 'boolean',
      default: 'true',
      description: `Disabling this prop will allow the user to scroll the page
      even when their pointer is over the flow.`,
    },
    {
      name: 'attributionPosition',
      type: 'PanelPosition',
      default: '"bottom-right"',
      description: `By default, React Flow will render a small attribution in
      the bottom right corner of the flow. You can use this prop to change its
      position in case you want to place something else there.`,
    },
  ],
};

export const edgeProps: PropsTableProps = {
  props: [
    {
      name: 'elevateEdgesOnSelect',
      type: 'boolean',
      default: 'false',
      description: `Enabling this option will raise the z-index of edges connected
      to a node when selected.`,
    },
    { name: 'defaultMarkerColor', type: 'string', default: '"#b1b1b7"' },
    {
      name: 'defaultEdgeOptions',
      type: 'DefaultEdgeOptions',
      description: `Any defaults set here will be applied to all new edges that
      are added to the flow. Properties on a new edge will override these defaults
      if they exist.`,
    },
    {
      name: 'reconnectRadius',
      type: 'number',
      default: '10',
      description: `The radius around an edge connection that can trigger an edge
      reconnection.`,
    },
    {
      name: 'edgesReconnectable',
      type: 'boolean',
      default: 'true',
      description: `Whether or not edges can be updated once they are created.
      When both this prop is true and an onReconnect handler is provided, the
      user can drag an existing edge to a new source or target. Individual edges
      can override this value with their reconnectable property.`,
    },
  ],
};

export const generalEventHandlerProps: PropsTableProps = {
  props: [
    {
      name: 'onInit',
      type: '(instance: ReactFlowInstance) => void',
      description: `The onInit callback is called when the viewport is initialized.
      At this point you can use the instance to call methods like fitView or zoomTo.`,
    },
    {
      name: 'onError',
      type: '(code: string, message: string) => void',
      description: `Ocassionally something may happen that causes React Flow to
      error. Instead of exploding your application, we log a message to the console
      and then call this event handler. You might use it for additional logging
      or to show a message to the user.`,
    },
    {
      name: 'onDelete',
      type: '({nodes: Node[], edges: Edge[]}) => void',
      description: `This handler gets called when a Node or Edge is deleted.`,
    },
    {
      name: 'onBeforeDelete',
      type: '({nodes: Node[], edges: Edge[]}) => Promise<boolean | {nodes: Node[], edges: Edge[]}>',
      description: `This handler gets before Nodes or Edges are about to be deleted. 
      Deletion can be aborted by returning false or the nodes and edges to be deleted can be modified.`,
    },
  ],
};

export const nodeEventHandlerProps: PropsTableProps = {
  props: [
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
    {
      name: 'onNodesChange',
      type: 'OnNodesChange',
      description: `Use this event handler to add interactivity to a controlled
      flow. It is called on node drag, select, and move.`,
    },
  ],
};

export const edgeEventHandlerProps: PropsTableProps = {
  props: [
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
      name: 'onReconnect',
      type: '(oldEdge: Edge, newConnection: Connection) => void',
      description: `This handler is called when the source or target of an reconnectable
      edge is dragged from the current node. It will fire even if the edge's source
      or target do not end up changing. You can use the reconnectEdge utility to
      convert the connection to a new edge.`,
    },
    {
      name: 'onReconnectStart',
      type: '(event: React.MouseEvent, edge: Edge, handleType: "source" | "target") => void',
      description: `This event fires when the user begins dragging the source or
      target of an editable edge. `,
    },
    {
      name: 'onReconnectEnd',
      type: '(event: React.MouseEvent, edge: Edge, handleType: "source" | "target") => void',
      description: `This event fires when the user releases the source or target
      of an editable edge. It is called even if an edge update does not occur.`,
    },
    { name: 'onEdgesDelete', type: '(edges: Edge[]) => void' },
    {
      name: 'onEdgesChange',
      type: 'OnEdgesChange',
      description: `Use this event handler to add interactivity to a controlled
      flow. It is called on edge select and remove.`,
    },
  ],
};

export const connectionEventHandlerProps: PropsTableProps = {
  props: [
    {
      name: 'onConnect',
      type: '(connection: Connection) => void',
      description: `When a connection line is completed and two nodes are connected
      by the user, this event fires with the new connection. You can use the
      addEdge utility to convert the connection to a complete edge.`,
    },
    {
      name: 'onConnectStart',
      type: '(event: React.MouseEvent, params: { nodeId: string | null; handleId: string | null; handleType: HandleType | null; }) => void',
    },
    { name: 'onConnectEnd', type: '(event: React.MouseEvent) => void' },
    {
      name: 'onClickConnectStart',
      type: '(event: React.MouseEvent, params: { nodeId: string | null; handleId: string | null; handleType: HandleType | null; }) => void',
    },
    { name: 'onClickConnectEnd', type: '(event: React.MouseEvent) => void' },
    {
      name: 'isValidConnection',
      type: '(connection: Connection) => boolean',
      description: `This callback can be used to validate a new connection. If
      you return false, the edge will not be added to your flow. If you have custom
      connection logic its preferred to use this callback over the isValidConnection
      prop on the handle component for performance reasons.`,
    },
  ],
};

export const paneEventHandlerProps: PropsTableProps = {
  props: [
    {
      name: 'onMove',
      type: '(event: React.MouseEvent | React.TouchEvent | null, data: Viewport) => void',
      description: `This event handler is called while the user is either panning
      or zooming the viewport.`,
    },
    {
      name: 'onMoveStart',
      type: '(event: React.MouseEvent | React.TouchEvent | null, data: Viewport) => void',
      description: `This event handler is called when the user begins to pan or
      zoom the viewport.`,
    },
    {
      name: 'onMoveEnd',
      type: '(event: React.MouseEvent | React.TouchEvent | null, data: Viewport) => void',
      description: `This event handler is called while the user stops either
      panning or zooming the viewport.`,
    },
    { name: 'onPaneClick', type: '(event: React.MouseEvent) => void' },
    { name: 'onPaneContextMenu', type: '(event: React.MouseEvent) => void' },
    { name: 'onPaneScroll', type: '(event: React.MouseEvent) => void' },
    { name: 'onPaneMouseMove', type: '(event: React.MouseEvent) => void' },
    { name: 'onPaneMouseEnter', type: '(event: React.MouseEvent) => void' },
    { name: 'onPaneMouseLeave', type: '(event: React.MouseEvent) => void' },
  ],
};

export const selectionEventHandlerProps: PropsTableProps = {
  props: [
    {
      name: 'onSelectionChange',
      type: '(params: { nodes: Node[]; edges: Edge[]; }) => void',
      description: ``,
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
    {
      name: 'onSelectionContextMenu',
      type: '(event: React.MouseEvent, nodes: Node[]) => void',
      description: `This event handler is called when a user right-clicks on a
      node selection.`,
    },
  ],
};

export const interactionProps: PropsTableProps = {
  props: [
    {
      name: 'nodesDraggable',
      type: 'boolean',
      default: 'true',
      description: `Controls whether all nodes should be draggable or not. Individual
      nodes can override this setting by setting their draggable prop. If you want
      to use the mouse handlers on non-draggable nodes, you need to add the "nopan"
      class to those nodes.`,
    },
    {
      name: 'nodesConnectable',
      type: 'boolean',
      default: 'true',
      description: `Controls whether all nodes should be connectable or not. Individual
      nodes can override this setting by setting their connectable prop.`,
    },
    {
      name: 'nodesFocusable',
      type: 'boolean',
      default: 'true',
      description: `When true, focus between nodes can be cycled with the Tab key
      and selected with the Enter key. This option can be overriden by individual
      nodes by setting their focusable prop.`,
    },
    {
      name: 'edgesFocusable',
      type: 'boolean',
      default: 'true',
      description: `When true, focus between edges can be cycled with the Tab key
      and selected with the Enter key. This option can be overriden by individual
      edges by setting their focusable prop.`,
    },
    {
      name: 'elementsSelectable',
      type: 'boolean',
      default: 'true',
      description: `When true, elements (nodes and edges) can be selected by clicking
      on them. This option can be overriden by individual elements by setting their
      selectable prop.`,
    },
    {
      name: 'autoPanOnConnect',
      type: 'boolean',
      default: 'true',
      description: `When try, the viewport will pan automatically when the cursor
      moves to the edge of the viewport while creating a connection.`,
    },
    {
      name: 'autoPanOnNodeDrag',
      type: 'boolean',
      default: 'true',
      description: `When true, the viewport will pan automatically when the cursor
      moves to the edge of the viewport while dragging a node.`,
    },
    {
      name: 'autoPanSpeed',
      type: 'number',
      default: `20`,
      description: `The speed at which the viewport will pan for autoPanOnNodeDrag and autoPanOnConnect`,
    },
    {
      name: 'panOnDrag',
      type: 'boolean | (0 | 1 | 2 | 3 | 4)[]',
      default: 'true',
      description: `Enabling this prop allows users to pan the viewport by clicking
      and dragging. You can also set this prop to an array of numbers to limit
      which mouse buttons can activate panning. For example, [0,2] would allow
      panning with the left and right mouse buttons.`,
    },
    { name: 'selectionOnDrag', type: 'boolean', default: 'false' },
    {
      name: 'selectionMode',
      type: '"partial" | "full"',
      default: '"full"',
      description: `When set to "partial", when the user creates a selection box
      by click and dragging nodes that are only partially in the box are still
      selected.`,
    },
    { name: 'panOnScroll', type: 'boolean', default: 'false' },
    { name: 'panOnScrollSpeed', type: 'number' },
    {
      name: 'panOnScrollMode',
      type: 'PanOnScrollMode',
      default: 'PanOnScrollMode.Free',
      description: `This prop is used to limit the direction of panning when
      panOnScroll is enabled. The "free" option allows panning in any direction.`,
    },
    { name: 'zoomOnScroll', type: 'boolean', default: 'true' },
    { name: 'zoomOnPinch', type: 'boolean', default: 'true' },
    { name: 'zoomOnDoubleClick', type: 'boolean', default: 'true' },
    { name: 'selectNodesOnDrag', type: 'boolean', default: 'true' },
    {
      name: 'elevateNodesOnSelect',
      type: 'boolean',
      default: 'true',
      description: `Enabling this option will raise the z-index of nodes when
      they are selected.`,
    },
    {
      name: 'connectOnClick',
      type: 'boolean',
      default: 'true',
      description: `The connectOnClick option lets you click or tap on a source
      handle to start a connection and then click on a target handle to complete
      the connection. If you set this option to false, users will need to drag
      the connection line to the target handle to create a connection.`,
    },
    {
      name: 'connectionMode',
      type: '"loose" | "strict"',
      default: '"strict"',
      description: `A loose connection mode will allow you to connect handles of
      any type to one another. The strict mode will only allow you to connect
      source handles to target handles.`,
    },
  ],
};

export const connectionLineProps: PropsTableProps = {
  props: [
    {
      name: 'connectionRadius',
      type: 'number',
      default: '20',
      description: `The radius around a handle where you drop a connection line
      to create a new edge.`,
    },
    {
      name: 'connectionLineType',
      type: 'ConnectionLineType',
      default: 'ConnectionLineType.Bezier',
      description: `The type of edge path to use for connection lines. Although
      created edges can be of any type, React Flow needs to know what type of
      path to render for the connection line before the edge is created!`,
    },
    { name: 'connectionLineStyle', type: 'React.CSSProperties' },
    {
      name: 'connectionLineComponent',
      type: 'React.ComponentType<ConnectionLineComponentProps>',
    },
    { name: 'connectionLineWrapperStyles', type: 'React.CSSProperties' },
  ],
};

export const keyboardProps: PropsTableProps = {
  props: [
    {
      name: 'deleteKeyCode',
      type: 'string | string[] | null',
      default: '"Backspace"',
      description: `If set, pressing the key or chord will delete any selected
      nodes and edges. Passing an array represents mutliple keys that can be
      pressed. For example, ["Delete", "Backspace"] will delete selected elements
      when either key is pressed.`,
    },
    {
      name: 'selectionKeyCode',
      type: 'string | string[] | null',
      default: '"Shift"',
      description: `If set, holding this key will let you click and drag to draw
      a selection box around multiple nodes and edges. Passing an array represents
      mutliple keys that can be pressed. For example, ["Shift", "Meta"] will
      allow you to draw a selection box when either key is pressed.`,
    },
    {
      name: 'multiSelectionKeyCode',
      type: 'string | string[] | null',
      default: '"Meta" for MacOs, "Control" for other systems',
    },
    {
      name: 'zoomActivationKeyCode',
      type: 'string | string[] | null',
      default: '"Meta" for MacOs, "Control" for other systems',
      description: `If a key is set, you can zoom the viewport while that key is
      held down even if panOnScroll is set to false. By setting this prop to null
      you can disable this functionality.`,
    },
    {
      name: 'panActivationKeyCode',
      type: 'string | string[] | null',
      default: '"Space"',
      description: `If a key is set, you can pan the viewport while that key is
      held down even if panOnScroll is set to false. By setting this prop to null
      you can disable this functionality.`,
    },
    {
      name: 'disableKeyboardA11y',
      type: 'boolean',
      default: 'false',
      description: `You can use this prop to disable keyboard accessibility features
      such as selecting nodes or moving selected nodes with the arrow keys.`,
    },
  ],
};
