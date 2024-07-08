import { type PropsTableProps } from 'xy-shared';

export const nodesAndEdgesFields: PropsTableProps = {
  props: [
    { name: 'getNode', type: '(id: string) => Node<T> | undefined' },
    { name: 'getNodes', type: '() => Node<T>[]' },
    {
      name: 'addNodes',
      type: '(payload: Node<T>[] | Node<T>) => void',
      description: `Add one or many nodes to your existing nodes array. Calling
      this function will trigger the onNodesChange handler in a controlled flow.`,
    },
    {
      name: 'setNodes',
      type: '(payload: Node<T>[] | ((nodes: Node<T>[]) => Node<T>[])) => void',
      description: `Set your nodes array to something else by either overwriting
      it with a new array or by passing in a function to update the existing array.
      If using a function, it is important to make sure a new array is returned
      instead of mutating the existing array. Calling this function will trigger
      the onNodesChange handler in a controlled flow.`,
    },
    { name: 'getEdge', type: '(id: string) => Edge<U> | undefined' },
    { name: 'getEdges', type: '() => Edge<U>[]' },
    {
      name: 'addEdges',
      type: '(payload: Edge<U>[] | Edge<U>) => void',
      description: `Add one or many edges to your existing edges array. Calling
      this function will trigger the onEdgesChange handler in a controlled flow.`,
    },
    {
      name: 'setEdges',
      type: '(payload: Edge<U>[] | ((edges: Edge<U>[]) => Edge<U>[])) => void',
      description: `Set your edges array to something else by either overwriting
      it with a new array or by passing in a function to update the existing array.
      If using a function, it is important to make sure a new array is returned
      instead of mutating the existing array. Calling this function will trigger
      the onEdgesChange handler in a controlled flow.`,
    },
    {
      name: 'toObject',
      type: '() => ReactFlowJsonObject<T, U>',
      description:
        'This function returns a JSON representation of your current React Flow graph.',
    },
    {
      name: 'deleteElements',
      type: 'DeleteElements',
    },
    {
      name: 'updateNode',
      type: '(id: string, nodeUpdate: Partial<NodeType> | ((node: NodeType) => Partial<NodeType>), options?: { replace: boolean },) => void',
    },
    {
      name: 'updateNodeData',
      type: '(id: string, dataUpdate: object | ((node: Node) => object), options?: { replace: boolean }) => void;',
    },
  ],
};

export const intersectionFields: PropsTableProps = {
  props: [
    {
      name: 'getIntersectingNodes',
      type: '(node: (Partial<Node<T>> & { id: Node["id"] }) | Rect, partially?: boolean, nodes?: Node<T>[]) => Node<T>[]',
      description: `Find all the nodes currently intersecting with a given node
      or rectangle. The partially parameter can be set to true to include nodes
      that are only partially intersecting.`,
    },
    {
      name: 'isNodeIntersecting',
      type: '(node: (Partial<Node<T>> & { id: Node["id"] }) | Rect, area: Rect, partially?: boolean) => boolean',
      description: `Determine if a given node or rectangle is intersecting with
      another rectangle. The partially parameter can be set to true return true
      even if the node is only partially intersecting.`,
    },
  ],
};

export const viewportFields: PropsTableProps = {
  props: [
    {
      name: 'viewportInitialized',
      type: 'boolean',
      description: `React Flow needs to mount the viewport to the DOM and initialize
      its zoom and pan behaviour. This property tells you when `,
    },
    { name: 'zoomIn', type: '(options?: { duration: number; }) => void' },
    { name: 'zoomOut', type: '(options?: { duration: number; }) => void' },
    {
      name: 'zoomTo',
      type: '(zoomLevel: number, options?: { duration: number; }) => void',
      description: `Zoom the viewport to a given zoom level. Passing in a duration
      will animate the viewport to the new zoom level. `,
    },
    {
      name: 'getZoom',
      type: '() => number',
      description: `Get the current zoom level of the viewport.`,
    },
    {
      name: 'setViewport',
      type: '(viewport: Viewport, options?: { duration: number; }) => void',
    },
    { name: 'getViewport', type: '() => Viewport' },
    { name: 'fitView', type: '(fitViewOptions?: FitViewOptions) => boolean' },
    {
      name: 'setCenter',
      type: '(x: number, y: number, options?: { duration: number, zoom: number; }) => void',
      description: `Center the viewport on a given position. Passing in a duration
      will animate the viewport to the new position.`,
    },
    {
      name: 'fitBounds',
      type: '(bounds: Rect, options?: { duration: number, padding: number; }) => void',
      description: `A low-level utility function to fit the viewport to a given
      rectangle. By pasing in a duration, the viewport will animate from its
      current position to the new position. The padding option can be used to
      add space around the bounds.`,
    },
    {
      name: 'project',
      type: '(position: { x: number; y: number; }) => { x: number; y: number; }',
      description: `⚠️ This function is deprecated and will be removed in v12.
      Please use screenToFlowPosition instead. When using screenToFlowPosition,
      you do not need to subtract the react flow bounds anymore.`,
    },
    {
      name: 'screenToFlowPosition',
      type: '(position: { x: number; y: number; }) => { x: number; y: number; }',
      description: `With this function you can translate a screen pixel position
      to a flow position. It is useful for implemting drag and drop from a sidebar
      for example.`,
    },
    {
      name: 'flowToScreenPosition',
      type: '(position: { x: number; y: number; }) => { x: number; y: number; }',
      description: `Translate a position inside the flow's canvas to a screen
      pixel position.`,
    },
  ],
};
