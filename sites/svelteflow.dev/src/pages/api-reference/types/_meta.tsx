import { getMetaConfigFromTitleLookup } from 'xy-shared';

const titleLookup = {
  'background-variant': 'BackgroundVariant',
  'color-mode': 'ColorMode',
  connection: 'Connection',
  'connection-line-type': 'ConnectionLineType',
  'coordinate-extent': 'CoordinateExtent',
  'default-edge-options': 'DefaultEdgeOptions',
  edge: 'Edge',
  'edge-marker': 'EdgeMarker',
  'edge-props': 'EdgeProps',
  'fit-view-options': 'FitViewOptions',
  'internal-node': 'InternalNode',
  'key-definition': 'KeyDefinition',
  'marker-type': 'MarkerType',
  node: 'Node',
  'node-props': 'NodeProps',
  'node-origin': 'NodeOrigin',
  'panel-position': 'PanelPosition',
  position: 'Position',
  'svelte-flow-store': 'SvelteFlowStore',
  viewport: 'Viewport',
  'xy-position': 'XYPosition',
};

export default getMetaConfigFromTitleLookup(
  titleLookup,
  '/api-reference/types',
);
