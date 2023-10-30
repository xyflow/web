import { type PropsTableProps } from 'xy-ui';

export const signature: PropsTableProps = {
  props: [
    { name: 'Returns' },
    {
      name: 'zoomIn',
      type: 'Function',
      description: '',
    },
    {
      name: 'zoomOut',
      type: 'Function',
      description: '',
    },
    {
      name: 'setZoom',
      type: '(zoomLevel: number, options?: ViewportHelperFunctionOptions) => void',
      description: '',
    },
    {
      name: 'getZoom',
      type: '() => number',
      description: '',
    },
    {
      name: 'setCenter',
      type: '(x: number, y: number, options?: SetCenterOptions) => void',
      description: '',
    },
    {
      name: 'setViewport',
      type: '(viewport: Viewport, options?: ViewportHelperFunctionOptions) => void',
      description: '',
    },
    {
      name: 'getViewport',
      type: '() => Viewport',
      description: '',
    },
    {
      name: 'fitView',
      type: '(options?: FitViewOptions) => void',
      description: '',
    },
    {
      name: 'getIntersectingNodes',
      type: `(
        nodeOrRect: Node | { id: Node['id'] } | Rect,
        partially?: boolean,
        nodesToIntersect?: Node[]
      ) => Node[]`,
      description: '',
    },
    {
      name: 'isNodeIntersecting',
      type: `(
        nodeOrRect: Node | { id: Node['id'] } | Rect,
        area: Rect,
        partially?: boolean
      ) => boolean`,
      description: '',
    },
    {
      name: 'fitBounds',
      type: `(bounds: Rect, options?: FitBoundsOptions) => void`,
      description: '',
    },
    {
      name: 'deleteElements',
      type: `
      (
        nodesToRemove?: (Node | { id: Node['id'] })[],
        edgesToRemove?: (Edge | { id: Edge['id'] })[]
      ) => { deletedNodes: Node[]; deletedEdges: Edge[] }`,
      description: '',
    },
    {
      name: 'screenToFlowCoordinate',
      type: `(position: XYPosition) => XYPosition`,
      description: 'Transforms a screen coordinate to a Svelte coordinate.',
    },
    {
      name: 'flowToScreenCoordinate',
      type: `(position: XYPosition) => XYPosition`,
      description: 'Transforms a Svelte coordinate to a screen coordinate.',
    },
    {
      name: 'getConnectedEdges',
      type: `(id: string | (Node | { id: Node['id'] })[]) => Edge[]`,
      description: '',
    },
    {
      name: 'getIncomers',
      type: `(node: string | Node | { id: Node['id'] }) => Node[]`,
      description: '',
    },
    {
      name: 'getOutgoers',
      type: ` (node: string | Node | { id: Node['id'] }) => Node[]`,
      description: '',
    },
  ],
};
