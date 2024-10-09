import { getMetaConfigFromTitleLookup } from 'xy-shared';

const titleLookup = {
  background: '<Background />',
  'base-edge': '<BaseEdge />',
  'control-button': '<ControlButton />',
  controls: '<Controls />',
  'edge-label-renderer': '<EdgeLabelRenderer />',
  'edge-text': '<EdgeText />',
  handle: '<Handle />',
  minimap: '<MiniMap />',
  'node-resizer': '<NodeResizer />',
  'node-resize-control': '<NodeResizeControl />',
  'node-toolbar': '<NodeToolbar />',
  panel: '<Panel />',
  'viewport-portal': '<ViewportPortal />',
};

export default getMetaConfigFromTitleLookup(
  titleLookup,
  '/api-reference/components',
);
