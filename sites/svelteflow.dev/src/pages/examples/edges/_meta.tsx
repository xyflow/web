import { getMetaConfigFromTitleLookup } from 'xy-shared';

const titleLookup = {
  'custom-connectionline': 'Connection Line',
  'custom-edges': 'Custom Edges',
  'edge-label-renderer': 'Edge Label Renderer',
  'edge-markers': 'Edge Markers',
  'edge-types': 'Edge Types',
  'simple-floating-edges': 'Simple Floating Edges',
};

export default getMetaConfigFromTitleLookup(titleLookup, '/examples/edges');
