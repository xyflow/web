import { type PropsTableProps } from '@/components/props-table';

export const nodesAndEdgesFields: PropsTableProps = {
  props: [
    ['getNode', '(id: string) => Node<T> | undefined'],
    ['getNodes', '() => Node<T>[]'],
    ['addNodes', '(payload: Node<T>[] | Node<T>) => void'],
    [
      'setNodes',
      '(payload: Node<T>[] | ((nodes: Node<T>[]) => Node<T>[])) => void',
    ],
    ['getEdge', '(id: string) => Edge<U> | undefined'],
    ['getEdges', '() => Edge<U>[]'],
    ['addEdges', '(payload: Edge<U>[] | Edge<U>) => void'],
    [
      'setEdges',
      '(payload: Edge<U>[] | ((edges: Edge<U>[]) => Edge<U>[])) => void',
    ],
    ['toObject', '() => ReactFlowJsonObject<T, U>'],
    [
      'deleteElements',
      '(payload: { nodes?: (Partial<Node> & { id: Node["id"] })[]; edges?: (Partial<Edge> & { id: Edge["id"] })[]; }) => void',
    ],
  ],
};

export const intersectionFields: PropsTableProps = {
  props: [
    [
      'getIntersectingNodes',
      '(node: (Partial<Node<T>> & { id: Node["id"] }) | Rect, partially?: boolean, nodes?: Node<T>[]) => Node<T>[]',
    ],
    [
      'isNodeIntersecting',
      '(node: (Partial<Node<T>> & { id: Node["id"] }) | Rect, area: Rect, partially?: boolean) => boolean',
    ],
  ],
};

export const viewportFields: PropsTableProps = {
  props: [
    ['viewportInitialized', 'boolean'],
    ['zoomIn', '(options?: { duration: number; }) => void'],
    ['zoomOut', '(options?: { duration: number; }) => void'],
    ['zoomTo', '(zoomLevel: number, options?: { duration: number; }) => void'],
    ['getZoom', '() => number'],
    [
      'setViewport',
      '(viewport: Viewport, options?: { duration: number; }) => void',
    ],
    ['getViewport', '() => Viewport'],
    ['fitView', '(fitViewOptions?: FitViewOptions) => boolean'],
    [
      'setCenter',
      '(x: number, y: number, options?: { duration: number, zoom: number; }) => void',
    ],
    [
      'fitBounds',
      '(bounds: Rect, options?: { duration: number, padding: number; }) => void',
    ],
    [
      'project',
      '(position: { x: number; y: number; }) => { x: number; y: number; }',
    ],
  ],
};