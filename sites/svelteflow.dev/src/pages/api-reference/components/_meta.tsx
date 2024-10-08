import { getMetaConfigFromTitleLookup } from 'xy-shared';

const titleLookup = {
  background: '<Background />',
  'base-edge': '<BaseEdge />',
  'control-button': '<ControlButton />',
  controls: '<Controls />',
  'edge-label-renderer': '<EdgeLabelRenderer />',
  'edge-label': '<EdgeLabel />',
  handle: '<Handle />',
  'mini-map': '<MiniMap />',
  'node-resizer': '<NodeResizer />',
  'node-resize-control': '<NodeResizeControl />',
  'node-toolbar': '<NodeToolbar />',
  panel: '<Panel />',
};

export default getMetaConfigFromTitleLookup(
  titleLookup,
  '/api-reference/components',
);
