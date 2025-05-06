import type { FC } from 'react';
import { useMDXComponents as getMDXComponents } from '@/mdx-components';

const { APIDocs } = getMDXComponents() as unknown as { APIDocs: FC<{ code?: string }> };

const FIELDS = {
  common: [
    'nodes',
    'edges',
    'nodeTypes',
    'edgeTypes',
    'colorMode',
    'nodeOrigin',
    'nodeDragThreshold',
    'style',
    'class',
  ],
  viewport: [
    'viewport',
    'fitView',
    'fitViewOptions',
    'minZoom',
    'maxZoom',
    'snapGrid',
    'onlyRenderVisibleElements',
    'translateExtent',
    'preventScrolling',
  ],
  edge: ['defaultMarkerColor', 'defaultEdgeOptions'],
  nodeEvents: [
    'onnodeclick',
    'onnodedragstart',
    'onnodedrag',
    'onnodedragstop',
    'onnodepointerenter',
    'onnodepointermove',
    'onnodepointerleave',
    'onnodecontextmenu',
  ],
  selectionEvents: ['onselectionclick', 'onselectioncontextmenu'],
  paneEvents: ['onpaneclick', 'onpanecontextmenu'],
  generalEvents: ['oninit', 'onerror', 'ondelete', 'onbeforedelete'],
  edgeEvents: [
    'onedgeclick',
    'onedgecontextmenu',
    'onedgepointerenter',
    'onedgepointerleave',
  ],
  connectionEvents: ['onconnect', 'onconnectstart', 'onconnectend', 'isValidConnection'],
  interaction: [
    'nodesDraggable',
    'nodesConnectable',
    'elementsSelectable',
    'autoPanOnConnect',
    'autoPanOnNodeDrag',
    'panOnDrag',
    'selectionOnDrag',
    'selectionMode',
    'panOnScroll',
    'panOnScrollMode',
    'zoomOnScroll',
    'zoomOnPinch',
    'zoomOnDoubleClick',
    'selectNodesOnDrag',
    'connectionMode',
  ],
  connectionLine: [
    'connectionRadius',
    'connectionLineType',
    'connectionLineStyle',
    'connectionLineContainerStyle',
  ],
  keyboard: [
    'deleteKey',
    'selectionKey',
    'multiSelectionKey',
    'zoomActivationKey',
    'panActivationKey',
  ],
};

export const SvelteFlowAPIProps: FC<{ group: keyof typeof FIELDS }> = ({ group }) => {
  const pickedFields = FIELDS[group].map((v) => `"${v}"`).join('|');
  const myType = `Pick<SvelteFlowProps, ${pickedFields}>`;

  return (
    <APIDocs
      code={`
import type { ComponentProps } from 'svelte'
import type { SvelteFlow } from '@xyflow/svelte'

type SvelteFlowProps = ComponentProps<typeof SvelteFlow>

type $ = ${myType}

export default $`}
    />
  );
};
