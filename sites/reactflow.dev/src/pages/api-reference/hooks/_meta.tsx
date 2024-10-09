import { getMetaConfigFromTitleLookup } from 'xy-shared';

const titleLookup = {
  'use-connection': 'useConnection()',
  'use-edges': 'useEdges()',
  'use-edges-state': 'useEdgesState()',
  'use-handle-connections': 'useHandleConnections()',
  'use-key-press': 'useKeyPress()',
  'use-node-id': 'useNodeId()',
  'use-nodes': 'useNodes()',
  'use-internal-node': 'useInternalNode()',
  'use-nodes-data': 'useNodesData()',
  'use-nodes-initialized': 'useNodesInitialized()',
  'use-nodes-state': 'useNodesState()',
  'use-on-selection-change': 'useOnSelectionChange()',
  'use-on-viewport-change': 'useOnViewportChange()',
  'use-react-flow': 'useReactFlow()',
  'use-store': 'useStore()',
  'use-store-api': 'useStoreApi()',
  'use-update-node-internals': 'useUpdateNodeInternals()',
  'use-viewport': 'useViewport()',
};

export default getMetaConfigFromTitleLookup(
  titleLookup,
  '/api-reference/hooks',
);
