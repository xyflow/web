import { getMetaConfigFromTitleLookup } from 'xy-shared';

const titleLookup = {
  'add-edge': 'addEdge()',
  'apply-edge-changes': 'applyEdgeChanges()',
  'apply-node-changes': 'applyNodeChanges()',
  'get-bezier-path': 'getBezierPath()',
  'get-connected-edges': 'getConnectedEdges()',
  'get-incomers': 'getIncomers()',
  'get-nodes-bounds': 'getNodesBounds()',
  'get-outgoers': 'getOutgoers()',
  'get-simple-bezier-path': 'getSimpleBezierPath()',
  'get-smooth-step-path': 'getSmoothStepPath()',
  'get-straight-path': 'getStraightPath()',
  'get-viewport-for-bounds': 'getViewportForBounds()',
  'is-edge': 'isEdge()',
  'is-node': 'isNode()',
  'reconnect-edge': 'reconnectEdge()',
};

export default getMetaConfigFromTitleLookup(
  titleLookup,
  '/api-reference/utils',
);
