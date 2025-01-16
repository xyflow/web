import { getMetaConfigFromTitleLookup } from 'xy-shared';

const titleLookup = {
  'custom-edges': 'Custom Edges',
  'edge-types': 'Edge Types',
  'edge-labels': 'Edge Labels',
  'edge-markers': 'Edge Markers',
  'custom-connectionline': 'Connection Line',
  'simple-floating-edges': 'Simple Floating Edges',
};

export default getMetaConfigFromTitleLookup(titleLookup, '/examples/edges');
