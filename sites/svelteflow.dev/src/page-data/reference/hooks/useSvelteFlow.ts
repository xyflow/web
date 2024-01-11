import { type PropsTableProps } from 'xy-shared';

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
        nodeOrRect: Node | { id: string } | Rect,
        partially?: boolean,
        nodesToIntersect?: Node[]
      ) => Node[]`,
      description: '',
    },
    {
      name: 'isNodeIntersecting',
      type: `(
        nodeOrRect: Node | { id: string } | Rect,
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
      async ({ nodes, edges }: {
        nodes?: Node[] | { id: string }[],
        edges?: Edge[] | { id: string }[]
      }) => { deletedNodes: Node[]; deletedEdges: Edge[] }`,
      description:
        'Helper function to remove nodes and edges that also deletes connected edges and child nodes.',
    },
    {
      name: 'screenToFlowPosition',
      type: `(position: XYPosition) => XYPosition`,
      description: 'Transforms a screen position to a Svelte position.',
    },
    {
      name: 'flowToScreenPosition',
      type: `(position: XYPosition) => XYPosition`,
      description: 'Transforms a Svelte position to a screen position.',
    },
    {
      name: 'updateNode',
      type: `(id: string, node: Node | (node: Node) => Partial<Node>, options?: { replace: boolean }) => void`,
      description:
        'Function for updating a node. The passed node or function result gets merged into to the existing node. You can change that behaviour and replace the node by passing `options.replace = true`.',
    },
    {
      name: 'updateNodeData',
      type: `(id: string, data: object | (node: Node) => object, options?: { replace: boolean }) => void`,
      description:
        'Function for updating node data. The passed data or function result gets merged into to the existing node data. You can change that behaviour and replace the node by passing `options.replace = true`.',
    },
  ],
};
