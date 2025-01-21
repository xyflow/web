import { getMetaConfigFromTitleLookup } from 'xy-shared';

const titleLookup = {
  'use-connection': 'useConnection()',
  'use-edges': 'useEdges()',
  'use-handle-connections': 'useHandleConnections()',
  'use-node-connections': 'useNodeConnections()',
  'use-internal-node': 'useInternalNode()',
  'use-nodes': 'useNodes()',
  'use-nodes-data': 'useNodesData()',
  'use-nodes-initialized': 'useNodesInitialized()',
  'use-svelte-flow': 'useSvelteFlow()',
  'use-store': 'useStore()',
  'use-update-node-internals': 'useUpdateNodeInternals()',
};

export default getMetaConfigFromTitleLookup(
  titleLookup,
  '/api-reference/hooks',
);
