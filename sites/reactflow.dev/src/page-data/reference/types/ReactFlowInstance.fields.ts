import { type PropsTableProps } from 'xy-shared';

export const nodesAndEdgesFields: PropsTableProps = {
  props: [
    { name: 'getNode', type: '(id: string) => Node<T> | undefined' },
    { name: 'getNodes', type: '() => Node<T>[]' },
    { name: 'addNodes', type: '(payload: Node<T>[] | Node<T>) => void' },
    {
      name: 'setNodes',
      type: '(payload: Node<T>[] | ((nodes: Node<T>[]) => Node<T>[])) => void',
    },
    { name: 'getEdge', type: '(id: string) => Edge<U> | undefined' },
    { name: 'getEdges', type: '() => Edge<U>[]' },
    { name: 'addEdges', type: '(payload: Edge<U>[] | Edge<U>) => void' },
    {
      name: 'setEdges',
      type: '(payload: Edge<U>[] | ((edges: Edge<U>[]) => Edge<U>[])) => void',
    },
    { name: 'toObject', type: '() => ReactFlowJsonObject<T, U>' },
    {
      name: 'deleteElements',
      type: 'DeleteElements',
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
    },
    {
      name: 'isNodeIntersecting',
      type: '(node: (Partial<Node<T>> & { id: Node["id"] }) | Rect, area: Rect, partially?: boolean) => boolean',
    },
  ],
};

export const viewportFields: PropsTableProps = {
  props: [
    { name: 'viewportInitialized', type: 'boolean' },
    { name: 'zoomIn', type: '(options?: { duration: number; }) => void' },
    { name: 'zoomOut', type: '(options?: { duration: number; }) => void' },
    {
      name: 'zoomTo',
      type: '(zoomLevel: number, options?: { duration: number; }) => void',
    },
    { name: 'getZoom', type: '() => number' },
    {
      name: 'setViewport',
      type: '(viewport: Viewport, options?: { duration: number; }) => void',
    },
    { name: 'getViewport', type: '() => Viewport' },
    { name: 'fitView', type: '(fitViewOptions?: FitViewOptions) => boolean' },
    {
      name: 'setCenter',
      type: '(x: number, y: number, options?: { duration: number, zoom: number; }) => void',
    },
    {
      name: 'fitBounds',
      type: '(bounds: Rect, options?: { duration: number, padding: number; }) => void',
    },
    {
      name: 'project',
      type: '(position: { x: number; y: number; }) => { x: number; y: number; }',
      description:
        '⚠️ This function is deprecated and will be removed in v12. Please use `screenToFlowPosition` instead. When using `screenToFlowPosition`, you do not need to subtract the react flow bounds anymore.',
    },
    {
      name: 'screenToFlowPosition',
      type: '(position: { x: number; y: number; }) => { x: number; y: number; }',
      description:
        'With this function you can translate a screen pixel position to a flow position. It is useful for implemting drag and drop from a sidebar for example.',
    },
    {
      name: 'flowToScreenPosition',
      type: '(position: { x: number; y: number; }) => { x: number; y: number; }',
    },
  ],
};
