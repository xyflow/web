import { type PropsTableProps } from 'xy-shared';

export const svelteFlowStoreFields: PropsTableProps = {
  props: [
    { name: 'flowId', type: 'Writable<string | null>' },
    { name: 'nodes', type: 'NodesStore' },
    { name: 'nodeLookup', type: 'Readable<NodeLookup>' },
    { name: 'edgeLookup', type: 'Readable<EdgeLookup>' },
    { name: 'visibleNodes', type: 'Readable<Node[]>' },
    { name: 'edges', type: 'EdgesStore' },
    { name: 'visibleEdges', type: 'Readable<EdgeLayouted[]>' },
    { name: 'connectionLookup', type: 'Readable<ConnectionLookup>' },
    { name: 'height', type: 'Writable<number>' },
    { name: 'width', type: 'Writable<number>' },
    { name: 'minZoom', type: 'Writable<number>' },
    { name: 'maxZoom', type: 'Writable<number>' },
    { name: 'nodeOrigin', type: 'Writable<NodeOrigin>' },
    { name: 'nodeDragThreshold', type: 'Writable<number>' },
    { name: 'nodeExtent', type: 'Writable<CoordinateExtent>' },
    { name: 'translateExtent', type: 'Writable<CoordinateExtent>' },
    { name: 'autoPanOnNodeDrag', type: 'Writable<boolean>' },
    { name: 'autoPanOnConnect', type: 'Writable<boolean>' },
    { name: 'fitViewOnInit', type: 'Writable<boolean>' },
    { name: 'fitViewOnInitDone', type: 'Writable<boolean>' },
    { name: 'fitViewOptions', type: 'Writable<FitViewOptions>' },
    { name: 'panZoom', type: 'Writable<PanZoomInstance | null>' },
    { name: 'snapGrid', type: 'Writable<SnapGrid | null>' },
    { name: 'dragging', type: 'Writable<boolean>' },
    { name: 'selectionRect', type: 'Writable<SelectionRect | null>' },
    { name: 'selectionKeyPressed', type: 'Writable<boolean>' },
    { name: 'multiselectionKeyPressed', type: 'Writable<boolean>' },
    { name: 'deleteKeyPressed', type: 'Writable<boolean>' },
    { name: 'panActivationKeyPressed', type: 'Writable<boolean>' },
    { name: 'zoomActivationKeyPressed', type: 'Writable<boolean>' },
    { name: 'selectionRectMode', type: 'Writable<string | null>' },
    { name: 'selectionMode', type: 'Writable<SelectionMode>' },
    { name: 'nodeTypes', type: 'Writable<NodeTypes>' },
    { name: 'edgeTypes', type: 'Writable<EdgeTypes>' },
    { name: 'viewport', type: 'Writable<Viewport>' },
    { name: 'connectionMode', type: 'Writable<ConnectionMode>' },
    { name: 'domNode', type: 'Writable<HTMLDivElement | null>' },
    { name: 'connection', type: 'Readable<ConnectionProps>' },
    { name: 'connectionLineType', type: 'Writable<ConnectionLineType>' },
    { name: 'connectionRadius', type: 'Writable<number>' },
    { name: 'isValidConnection', type: 'Writable<IsValidConnection>' },
    { name: 'nodesDraggable', type: 'Writable<boolean>' },
    { name: 'nodesConnectable', type: 'Writable<boolean>' },
    { name: 'elementsSelectable', type: 'Writable<boolean>' },
    { name: 'selectNodesOnDrag', type: 'Writable<boolean>' },
    { name: 'markers', type: 'Readable<MarkerProps[]>' },
    { name: 'defaultMarkerColor', type: 'Writable<string>' },
    { name: 'lib', type: 'Readable<string>' },
    { name: 'onlyRenderVisibleElements', type: 'Writable<boolean>' },
    { name: 'onerror', type: 'Writable<OnError>' },
    { name: 'ondelete', type: 'Writable<OnDelete>' },
    { name: 'onedgecreate', type: 'Writable<OnEdgeCreate>' },
    { name: 'onconnect', type: 'Writable<OnConnect>' },
    { name: 'onconnectstart', type: 'Writable<OnConnectStart>' },
    { name: 'onconnectend', type: 'Writable<OnConnectEnd>' },
    { name: 'onbeforedelete', type: 'Writable<OnBeforeDelete>' },
    { name: 'setNodeTypes', type: 'Writable<(nodeTypes: NodeTypes) => void>' },
    { name: 'setEdgeTypes', type: 'Writable<(edgeTypes: EdgeTypes) => void>' },
    { name: 'addEdge', type: 'Writable<(edge: Edge | Connection) => void>' },
    {
      name: 'zoomIn',
      type: 'Writable<(options?: ViewportHelperFunctionOptions) => void>',
    },
    {
      name: 'zoomOut',
      type: 'Writable<(options?: ViewportHelperFunctionOptions) => void>',
    },
    { name: 'setMinZoom', type: 'Writable<(minZoom: number) => void>' },
    { name: 'setMaxZoom', type: 'Writable<(maxZoom: number) => void>' },
    {
      name: 'setTranslateExtent',
      type: 'Writable<(extent: CoordinateExtent) => void>',
    },
    {
      name: 'fitView',
      type: 'Writable<(options?: FitViewOptions) => boolean>',
    },
    { name: 'updateNodePositions', type: 'Writable<UpdateNodePositions>' },
    {
      name: 'updateNodeDimensions',
      type: 'Writable<(updates: Map<string, NodeDimensionUpdate>) => void>',
    },
    {
      name: 'unselectNodesAndEdges',
      type: 'Writable<(params?: { nodes?: Node[]; edges?: Edge[] }) => void>',
    },
    { name: 'addSelectedNodes', type: 'Writable<(ids: string[]) => void>' },
    { name: 'addSelectedEdges', type: 'Writable<(ids: string[]) => void>' },
    { name: 'handleNodeSelection', type: 'Writable<(id: string) => void>' },
    { name: 'panBy', type: 'Writable<(delta: XYPosition) => boolean>' },
    { name: 'updateConnection', type: 'Writable<UpdateConnection>' },
    { name: 'cancelConnection', type: 'Writable<() => void>' },
    { name: 'reset', type: 'Writable<() => void>' },
  ],
};
