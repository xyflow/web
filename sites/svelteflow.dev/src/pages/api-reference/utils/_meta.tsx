import { getMetaConfigFromTitleLookup } from 'xy-shared';

const titleLookup = {
  'add-edge': 'addEdge()',
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
};

export default getMetaConfigFromTitleLookup(
  titleLookup,
  '/api-reference/utils',
);
