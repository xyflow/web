import { type PropsTableProps } from 'xy-ui';

export const commonProps: PropsTableProps = {
  deeplinkPrefix: 'common',
  props: [
    {
      name: 'nodes?',
      type: 'Writable<Node[]>',
      default: 'writable([])',
      description: 'A writable store with an array of nodes.',
    },
    {
      name: 'edges?',
      type: 'Writable<Edge[]>',
      default: 'writable([])',
      description: 'A writable store with an array of edges.',
    },
    {
      name: 'nodeTypes?',
      type: 'Record<string, ComponentType<SvelteComponent<NodeProps>>>',
      description: `If you want to use custom nodes in your flow, you need to let
      Svelte Flow know about them. When rendering a new node, Svelte Flow will look
      up that node's type in this object and render the corresponding component.`,
    },
    {
      name: 'edgeTypes?',
      type: 'Record<string, ComponentType<SvelteComponent<EdgeProps>>>',
      description: `As with node types, this prop lets you use custom edges in
      your flow by mapping edge types to Svelte components.`,
    },
    {
      name: 'nodeOrigin',
      type: '[number, number]',
      default: '[0,0]',
      description: `The origin of the node to use when placing it in the flow or looking up its x and y position.
        An origin of [0,0] means that a node's top left corner will be placed at the x and y position.`,
    },
    { name: 'style?', type: 'string' },
    { name: 'class?', type: 'string' },
    {
      name: 'proOptions?',
      type: 'ProOptions',
      description: `Our pro options are configuration settings intended for 
      Pro subscribers. Anyone is free to use them, though!`,
    },
  ],
};

export const viewportProps: PropsTableProps = {
  deeplinkPrefix: 'viewport',
  props: [
    {
      name: 'initialViewport?',
      type: 'Viewport',
      default: '{ x: 0, y: 0, zoom: 1 }',
      description: `Sets the initial position and zoom of the viewport. If a
      default viewport is provided but fitView is enabled, the default viewport
      will be ignored.`,
    },
    {
      name: 'viewport?',
      type: 'Writable<Viewport>',
      default: 'undefined',
      description: `If you need more control over the viewport, you can pass a writable store.`,
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
      description: `When you typically call fitView on a Svelte Flow instance, you
      can provide an object of options to customize its behaviour. This prop lets
      you do the same for the initial fitView call.`,
    },
    { name: 'minZoom?', type: 'number', default: '0.5' },
    { name: 'maxZoom?', type: 'number', default: '2' },
    {
      name: 'snapGrid?',
      type: '[number, number] | undefined',
      default: 'undefined',
      description: `This prop configures the grid that nodes will snap to.`,
    },
    {
      name: 'onlyRenderVisibleElements?',
      type: 'boolean',
      default: 'false',
      description: `You can enable this optimisation to instruct Svelte Flow to
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
      description: `By default, Svelte Flow will render a small attribution in
      the bottom right corner of the flow. You can use this prop to change its
      position in case you want to place something else there.`,
    },
  ],
};

export const edgeProps: PropsTableProps = {
  deeplinkPrefix: 'edge',
  props: [
    { name: 'defaultMarkerColor?', type: 'string', default: '"#b1b1b7"' },
    {
      name: 'defaultEdgeOptions?',
      type: 'DefaultEdgeOptions',
      description: `Any defaults set here will be applied to all new edges that
      are added to the flow. Properties on a new edge will override these defaults
      if they exist.`,
    },
  ],
};

export const eventHandlerProps: PropsTableProps = {
  deeplinkPrefix: 'event',
  props: [
    { name: 'General' },
    {
      name: 'on:error?',
      type: '(code: string, message: string) => void',
      description: `Ocassionally something may happen that causes Svelte Flow to
      error. Instead of exploding your application, we log a message to the console
      and then call this event handler. You might use it for additional logging
      or to show a message to the user.`,
    },
    { name: 'Nodes' },
    {
      name: 'on:nodeclick?',
      type: 'CustomEvent<{ event: MouseEvent | TouchEvent; node: Node }>',
    },
    {
      name: 'on:nodecontextmenu?',
      type: 'CustomEvent<{ event: MouseEvent; node: Node }>',
    },
    {
      name: 'on:nodemouseenter?',
      type: 'CustomEvent<{ event: MouseEvent; node: Node }>',
    },
    {
      name: 'on:nodemousemove?',
      type: 'CustomEvent<{ event: MouseEvent; node: Node }>',
    },
    {
      name: 'on:nodemouseleave?',
      type: 'CustomEvent<{ event: MouseEvent; node: Node }>',
    },
    {
      name: 'on:nodedragstart?',
      type: 'CustomEvent<{ event: MouseEvent; node: NodeBase; nodes: NodeBase[] }>',
    },
    {
      name: 'on:nodedrag?',
      type: 'CustomEvent<{ event: MouseEvent; node: NodeBase; nodes: NodeBase[] }>',
    },
    {
      name: 'on:nodedragstop?',
      type: 'CustomEvent<{ event: MouseEvent; node: NodeBase; nodes: NodeBase[] }>',
    },
    { name: 'Edges' },
    {
      name: 'on:edgeclick?',
      type: 'CustomEvent<{ event: MouseEvent; edge: Edge }>',
    },
    {
      name: 'on:edgecontextmenu?',
      type: 'CustomEvent<{ event: MouseEvent; edge: Edge }>',
    },
    { name: 'Connections' },
    {
      name: 'on:connectstart?',
      type: `CustomEvent<{
        event: MouseEvent | TouchEvent;
        nodeId?: string;
        handleId?: string;
        handleType?: HandleType;
      }>`,
      description: `When a user starts to drag a connection line, this event gets fired.`,
    },
    {
      name: 'on:connect?',
      type: 'CustomEvent<{ connection: Connection }>',
      description: `This event gets fired when a connection successfully completes.`,
    },
    {
      name: 'on:connectend?',
      type: 'CustomEvent<{ event: MouseEvent | TouchEvent }>',
      description: `Whenever the user drops the connection line, this events get fired. No matter if a connection was created or not.`,
    },
    { name: 'Pane' },
    {
      name: 'on:paneclick?',
      type: 'CustomEvent<{ event: MouseEvent | TouchEvent }>',
    },
    { name: 'on:panecontextmenu?', type: 'CustomEvent<{ event: MouseEvent }>' },
  ],
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
    {
      name: 'connectionMode?',
      type: '"loose" | "strict"',
      default: '"strict"',
      description: `A loose connection mode will allow you to connect handles of
      any type to one another. The strict mode will only allow you to connect
      source handles to target handles.`,
    },
  ],
};

export const connectionLineProps: PropsTableProps = {
  deeplinkPrefix: 'connection',
  props: [
    {
      name: 'isValidConnection',
      type: 'IsValidConnection',
      default: '() => true',
      description: `This prop allows you to control which connections are valid. It gets called before an edge is created.`,
    },
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
      created edges can be of any type, Svelte Flow needs to know what type of
      path to render for the connection line before the edge is created!`,
    },
    { name: 'connectionLineStyle?', type: 'string' },
    { name: 'connectionLineWrapperStyles?', type: 'string' },
  ],
};
