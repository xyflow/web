import { getMetaConfigFromTitleLookup } from 'xy-shared';

const titleLookup = {
  'custom-node': 'Custom Nodes',
  'update-node': 'Updating Nodes',
  stress: 'Stress Test',
  hidden: 'Hidden',
  'drag-handle': 'Drag Handle',
  'easy-connect': 'Easy Connect',
  'add-node-on-edge-drop': 'Add Node On Edge Drop',
  'proximity-connect': 'Proximity Connect',
  'node-resizer': 'Node Resizer',
  'node-toolbar': 'Node Toolbar',
  'resize-rotate': 'Resize and Rotate',
  'dynamic-grouping': 'Dynamic Grouping',
  intersections: 'Intersections',
  shapes: 'Shapes',
  'connection-limit': 'Connection Limit',
  'delete-middle-node': 'Delete Middle Node',
};

export default getMetaConfigFromTitleLookup(titleLookup, '/examples/nodes');
