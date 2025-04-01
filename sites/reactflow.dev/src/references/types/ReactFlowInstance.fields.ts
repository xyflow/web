import { type PropsTableProps } from 'xy-shared';

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
      its zoom and pan behavior. This property tells you when`,
    },
    { name: 'zoomIn', type: '(options?: { duration: number; }) => void' },
    { name: 'zoomOut', type: '(options?: { duration: number; }) => void' },
    {
      name: 'zoomTo',
      type: '(zoomLevel: number, options?: { duration: number; }) => void',
      description: `Zoom the viewport to a given zoom level. Passing in a duration
      will animate the viewport to the new zoom level.`,
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
      rectangle. By passing in a duration, the viewport will animate from its
      current position to the new position. The padding option can be used to
      add space around the bounds.`,
    },
    {
      name: 'screenToFlowPosition',
      type: '(position: { x: number; y: number; }) => { x: number; y: number; }',
      description: `With this function you can translate a screen pixel position
      to a flow position. It is useful for implementing drag and drop from a sidebar
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
