import { type PropsTableProps } from 'xy-shared';

export const commonProps: PropsTableProps = {
  props: [
    {
      name: 'nodes',
      type: 'Writable<Node[]>',
      default: 'writable([])',
      description: 'A writable store with an array of nodes.',
    },
    {
      name: 'edges',
      type: 'Writable<Edge[]>',
      default: 'writable([])',
      description: 'A writable store with an array of edges.',
    },
    {
      name: 'nodeTypes',
      type: 'Record<string, ComponentType<SvelteComponent<NodeProps>>>',
      description: `If you want to use custom nodes in your flow, you need to let
      Svelte Flow know about them. When rendering a new node, Svelte Flow will look
      up that node's type in this object and render the corresponding component.`,
    },
    {
      name: 'edgeTypes',
      type: 'Record<string, ComponentType<SvelteComponent<EdgeProps>>>',
      description: `As with node types, this prop lets you use custom edges in
      your flow by mapping edge types to Svelte components.`,
    },
    {
      name: 'colorMode',
      type: 'ColorMode',
      default: '"light"',
      description: `With this type you can switch between the built-in light and dark themes.`,
    },
    {
      name: 'nodeOrigin',
      type: '[number, number]',
      default: '[0,0]',
      description: `The origin of the node to use when placing it in the flow or looking up its x and y position.
        An origin of [0,0] means that a node's top left corner will be placed at the x and y position.`,
    },
    {
      name: 'nodeDragThreshold',
      type: 'number',
      default: '0',
      description: `
          With a threshold greater than zero you can delay node drag events. If threshold equals 1,
          you need to drag the node 1 pixel before a drag event is fired.
        `,
    },
    { name: 'style', type: 'string' },
    { name: 'class', type: 'string' },
  ],
};

export const viewportProps: PropsTableProps = {
  props: [
    {
      name: 'initialViewport',
      type: 'Viewport',
      default: '{ x: 0, y: 0, zoom: 1 }',
      description: `Sets the initial position and zoom of the viewport. If a
      default viewport is provided but fitView is enabled, the default viewport
      will be ignored.`,
    },
    {
      name: 'viewport',
      type: 'Writable<Viewport>',
      default: 'undefined',
      description: `If you need more control over the viewport, you can pass a writable store.`,
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
      description: `When you typically call fitView on a Svelte Flow instance, you
      can provide an object of options to customize its behaviour. This prop lets
      you do the same for the initial fitView call.`,
    },
    { name: 'minZoom', type: 'number', default: '0.5' },
    { name: 'maxZoom', type: 'number', default: '2' },
    {
      name: 'snapGrid',
      type: '[number, number] | undefined',
      default: 'undefined',
      description: `This prop configures the grid that nodes will snap to.`,
    },
    {
      name: 'onlyRenderVisibleElements',
      type: 'boolean',
      default: 'false',
      description: `You can enable this optimisation to instruct Svelte Flow to
      only render nodes and edges that would be visible in the viewport.`,
    },
    {
      name: 'translateExtent',
      type: 'CoordinateExtent',
      default: '[[-∞,-∞], [+∞,+∞]]',
      description: `By default the viewport extends infinitely. You can use this
      prop to set a boundary. The first pair of coordinates is the top left
      boundary and the second pair is the bottom right..`,
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
      description: `By default, Svelte Flow will render a small attribution in
      the bottom right corner of the flow. You can use this prop to change its
      position in case you want to place something else there.`,
    },
  ],
};

export const edgeProps: PropsTableProps = {
  props: [
    { name: 'defaultMarkerColor', type: 'string', default: '"#b1b1b7"' },
    {
      name: 'defaultEdgeOptions',
      type: 'DefaultEdgeOptions',
      description: `Any defaults set here will be applied to all new edges that
      are added to the flow. Properties on a new edge will override these defaults
      if they exist.`,
    },
    {
      name: 'onedgecreate',
      type: `(connection: Connection) => Edge`,
      description: `This handler gets called when a new edge is created. You can use it to modify the newly created edge.`,
    },
  ],
};

export const generalEventHandlerProps: PropsTableProps = {
  props: [
    {
      name: 'oninit',
      type: '() => void',
      description: 'This handler gets called when the flow is initialized.',
    },
    {
      name: 'onerror',
      type: '(code: string, message: string) => void',
      description: `Ocassionally something may happen that causes Svelte Flow to
      error. Instead of exploding your application, we log a message to the console
      and then call this handler. You might use it for additional logging
      or to show a message to the user.`,
    },
    {
      name: 'ondelete',
      type: '(params: { nodes: Node[]; edges: Edge[] }) => void',
      description:
        'This handler gets called when the user deletes nodes or edges.',
    },
    {
      name: 'onbeforedelete',
      type: 'async (params: { nodes: Node[]; edges: Edge[] }) => boolean',
      description:
        'This handler gets called before the user deletes nodes or edges and provides a way to abort the deletion by returning false.',
    },
  ],
};

export const nodeEventHandlerProps: PropsTableProps = {
  props: [
    {
      name: 'on:nodeclick',
      type: '(event: CustomEvent<{ event: MouseEvent | TouchEvent; node: Node }>) => void',
    },
    {
      name: 'on:nodecontextmenu',
      type: '(event: CustomEvent<{ event: MouseEvent; node: Node }>) => void',
    },
    {
      name: 'on:nodemouseenter',
      type: '(event: CustomEvent<{ event: MouseEvent; node: Node }>) => void',
    },
    {
      name: 'on:nodemousemove',
      type: '(event: CustomEvent<{ event: MouseEvent; node: Node }>) => void',
    },
    {
      name: 'on:nodemouseleave',
      type: '(event: CustomEvent<{ event: MouseEvent; node: Node }>) => void',
    },
    {
      name: 'on:nodedragstart',
      type: '(event: CustomEvent<{ event: MouseEvent; targetNode: Node | null; nodes: Node[] }>) => void',
      description: `This event is used for single nodes and selections. If you drag a selection, targetNode is null`,
    },
    {
      name: 'on:nodedrag',
      type: '(event: CustomEvent<{ event: MouseEvent; targetNode: Node | null; nodes: Node[] }>) => void',
      description: `This event is used for single nodes and selections. If you drag a selection, targetNode is null`,
    },
    {
      name: 'on:nodedragstop',
      type: '(event: CustomEvent<{ event: MouseEvent; targetNode: Node | null; nodes: Node[] }>) => void',
      description: `This event is used for single nodes and selections. If you drag a selection, targetNode is null`,
    },
  ],
};

export const edgeEventHandlerProps: PropsTableProps = {
  props: [
    {
      name: 'on:edgeclick',
      type: '(event: CustomEvent<{ event: MouseEvent; edge: Edge }>) => void',
    },
    {
      name: 'on:edgecontextmenu',
      type: '(event: CustomEvent<{ event: MouseEvent; edge: Edge }>) => void',
    },
  ],
};

export const selectionEventHandlers: PropsTableProps = {
  props: [
    {
      name: 'on:selectionclick',
      type: '(event: CustomEvent<{ event: MouseEvent; nodes: Node[] }>) => void',
    },
    {
      name: 'on:selectioncontextmenu',
      type: '(event: CustomEvent<{ event: MouseEvent; nodes: Node[] }>) => void',
    },
  ],
};

export const connectionEventHandlerProps: PropsTableProps = {
  props: [
    {
      name: 'onconnectstart',
      type: `(event: MouseEvent | TouchEvent, params: {
        nodeId?: string;
        handleId?: string;
        handleType?: 'source' | 'target';
      }) => void`,
      description: `When a user starts to drag a connection line, this event gets fired.`,
    },
    {
      name: 'onconnect',
      type: '(connection: Connection) => void',
      description: `This event gets fired when a connection successfully completes.`,
    },
    {
      name: 'onconnectend',
      type: '(event: MouseEvent | TouchEvent) => void',
      description: `Whenever the user drops the connection line, this events get fired. No matter if a connection was created or not.`,
    },
  ],
};

export const paneEventHandlerProps: PropsTableProps = {
  props: [
    {
      name: 'on:paneclick',
      type: '(event: CustomEvent<{ event: MouseEvent | TouchEvent }>) => void',
    },
    {
      name: 'on:panecontextmenu',
      type: '(event: CustomEvent<{ event: MouseEvent }>) => void',
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
    { name: 'elementsSelectable', type: 'boolean', default: 'true' },
    { name: 'autoPanOnConnect', type: 'boolean', default: 'true' },
    { name: 'autoPanOnNodeDrag', type: 'boolean', default: 'true' },
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
      type: '"free" | "horizontal" | "vertical"',
      default: '"free"',
      description: `This prop is used to limit the direction of panning when
      panOnScroll is enabled. The "free" option allows panning in any direction.`,
    },
    { name: 'zoomOnScroll', type: 'boolean', default: 'true' },
    { name: 'zoomOnPinch', type: 'boolean', default: 'true' },
    { name: 'zoomOnDoubleClick', type: 'boolean', default: 'true' },
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

export const keyboardProps: PropsTableProps = {
  props: [
    {
      name: 'deleteKey',
      type: 'KeyDefinition | KeyDefinition[] | null',
      default: '"Backspace"',
    },
    {
      name: 'selectionKey',
      type: 'KeyDefinition | KeyDefinition[] | null',
      default: '"Shift"',
    },
    {
      name: 'multiSelectionKey',
      type: 'KeyDefinition | KeyDefinition[] | null',
      default: '"Meta" for MacOs, "Control" for other systems',
    },
    {
      name: 'zoomActivationKey',
      type: 'KeyDefinition | KeyDefinition[] | null',
      default: '"Meta" for MacOs, "Control" for other systems',
      description: `If a key is set, you can zoom the viewport while that key is
      held down even if panOnScroll is set to false. By setting this prop to null
      you can disable this functionality.`,
    },
    {
      name: 'panActivationKey',
      type: 'KeyDefinition | KeyDefinition[] | null',
      default: '"Space"',
      description: `If a key is set, you can pan the viewport while that key is
      held down even if panOnScroll is set to false. By setting this prop to null
      you can disable this functionality.`,
    },
  ],
};

export const connectionLineProps: PropsTableProps = {
  props: [
    {
      name: 'isValidConnection',
      type: '(connection: Connection) => boolean',
      default: '() => true',
      description: `This prop allows you to control which connections are valid. It gets called before an edge is created.`,
    },
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
      created edges can be of any type, Svelte Flow needs to know what type of
      path to render for the connection line before the edge is created!`,
    },
    { name: 'connectionLineStyle', type: 'string' },
    { name: 'connectionLineWrapperStyles', type: 'string' },
  ],
};
