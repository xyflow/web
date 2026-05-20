import type { FC } from 'react';
import { useMDXComponents as getMDXComponents } from '@/mdx-components';

const { APIDocs } = getMDXComponents() as unknown as { APIDocs: FC<{ code?: string }> };

export const FIELDS = {
  viewport: [
    'viewport',
    'initialViewport',
    'fitView',
    'fitViewOptions',
    'minZoom',
    'maxZoom',
    'snapGrid',
    'onlyRenderVisibleElements',
    'translateExtent',
    'preventScrolling',
    'attributionPosition',
  ],
  style: ['noPanClass', 'noDragClass', 'noWheelClass'],
  node: [
    'nodeOrigin',
    'nodesDraggable',
    'nodesConnectable',
    'nodesFocusable',
    'nodeDragThreshold',
    'nodeClickDistance',
    'nodeExtent',
    'elevateNodesOnSelect',
  ],
  edge: [
    'edgesFocusable',
    'elevateEdgesOnSelect',
    'defaultMarkerColor',
    'defaultEdgeOptions',
  ],
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
  selectionEvents: [
    'onselectionchanged',
    'onselectionclick',
    'onselectioncontextmenu',
    'onselectiondragstart',
    'onselectiondrag',
    'onselectiondragstop',
    'onselectionstart',
    'onselectionend',
  ],
  paneEvents: ['onpaneclick', 'onpanecontextmenu', 'onmovestart', 'onmove', 'onmoveend'],
  generalEvents: ['oninit', 'onflowerror', 'ondelete', 'onbeforedelete'],
  edgeEvents: [
    'onedgeclick',
    'onedgecontextmenu',
    'onedgepointerenter',
    'onedgepointerleave',
    'onreconnect',
    'onreconnectstart',
    'onreconnectend',
    'onbeforereconnect',
  ],
  connectionEvents: [
    'onconnect',
    'onconnectstart',
    'onbeforeconnect',
    'onconnectend',
    'isValidConnection',
    'clickConnect',
    'onclickconnectstart',
    'onclickconnectend',
  ],
  interaction: [
    'elementsSelectable',
    'autoPanOnConnect',
    'autoPanOnNodeDrag',
    'selectNodesOnDrag',
    'panOnDrag',
    'selectionOnDrag',
    'selectionMode',
    'panOnScroll',
    'panOnScrollMode',
    'zoomOnScroll',
    'zoomOnPinch',
    'zoomOnDoubleClick',
    'connectionMode',
    'paneClickDistance',
    'zIndexMode',
  ],
  connectionLine: [
    'connectionRadius',
    'connectionLineComponent',
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
    'disableKeyboardA11y',
  ],
};

export type SvelteFlowAPIPropsGroup = keyof typeof FIELDS | 'common';

export function getSvelteFlowAPIPropsType(group: SvelteFlowAPIPropsGroup): string {
  let myType: string;
  if (group === 'common') {
    const omittedFields = Object.values(FIELDS)
      .flat()
      .map((v) => `"${v}"`)
      .join('|');
    const groupedProps = 'HTMLAttributes<HTMLDivElement>';

    myType = `
Omit<
  SvelteFlowProps,
  ${omittedFields} | keyof ${groupedProps}
> &
{ '...props': ${groupedProps} }`;
  } else {
    const pickedFields = FIELDS[group].map((v) => `"${v}"`).join('|');
    myType = `Pick<SvelteFlowProps, ${pickedFields}>`;
  }

  return myType;
}

export function getSvelteFlowAPIPropsCode(group: SvelteFlowAPIPropsGroup): string {
  const myType = getSvelteFlowAPIPropsType(group);
  return `
import type { SvelteFlowProps } from '@xyflow/svelte'
import type { HTMLAttributes } from 'svelte/elements'

type $ = ${myType}

export default $`;
}

export const SvelteFlowAPIProps: FC<{ group: SvelteFlowAPIPropsGroup }> = ({ group }) => {
  return <APIDocs code={getSvelteFlowAPIPropsCode(group)} />;
};
