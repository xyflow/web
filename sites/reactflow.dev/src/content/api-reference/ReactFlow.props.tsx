import type { FC } from 'react';
import { useMDXComponents as getMDXComponents } from '@/mdx-components';

const { APIDocs } = getMDXComponents() as unknown as { APIDocs: FC<{ code?: string }> };

export const FIELDS = {
  viewport: [
    'defaultViewport',
    'viewport',
    'onViewportChange',
    'fitView',
    'fitViewOptions',
    'minZoom',
    'maxZoom',
    'snapToGrid',
    'snapGrid',
    'onlyRenderVisibleElements',
    'translateExtent',
    'nodeExtent',
    'preventScrolling',
    'attributionPosition',
  ],
  edge: [
    'elevateEdgesOnSelect',
    'defaultMarkerColor',
    'defaultEdgeOptions',
    'reconnectRadius',
    'edgesReconnectable',
  ],
  nodeEvents: [
    'onNodeClick',
    'onNodeDoubleClick',
    'onNodeDragStart',
    'onNodeDrag',
    'onNodeDragStop',
    'onNodeMouseEnter',
    'onNodeMouseMove',
    'onNodeMouseLeave',
    'onNodeContextMenu',
    'onNodesDelete',
    'onNodesChange',
  ],
  selectionEvents: [
    'onSelectionChange',
    'onSelectionDragStart',
    'onSelectionDrag',
    'onSelectionDragStop',
    'onSelectionStart',
    'onSelectionEnd',
    'onSelectionContextMenu',
  ],
  paneEvents: [
    'onMove',
    'onMoveStart',
    'onMoveEnd',
    'onPaneClick',
    'onPaneContextMenu',
    'onPaneScroll',
    'onPaneMouseMove',
    'onPaneMouseEnter',
    'onPaneMouseLeave',
  ],
  style: ['noPanClassName', 'noDragClassName', 'noWheelClassName'],
  generalEvents: ['onInit', 'onError', 'onDelete', 'onBeforeDelete'],
  edgeEvents: [
    'onEdgeClick',
    'onEdgeDoubleClick',
    'onEdgeMouseEnter',
    'onEdgeMouseMove',
    'onEdgeMouseLeave',
    'onEdgeContextMenu',
    'onReconnect',
    'onReconnectStart',
    'onReconnectEnd',
    'onEdgesDelete',
    'onEdgesChange',
  ],
  connectionEvents: [
    'onConnect',
    'onConnectStart',
    'onConnectEnd',
    'onClickConnectStart',
    'onClickConnectEnd',
    'isValidConnection',
  ],
  interaction: [
    'nodesDraggable',
    'nodesConnectable',
    'nodesFocusable',
    'edgesFocusable',
    'elementsSelectable',
    'autoPanOnConnect',
    'autoPanOnNodeDrag',
    'autoPanSpeed',
    'panOnDrag',
    'selectionOnDrag',
    'selectionMode',
    'panOnScroll',
    'panOnScrollSpeed',
    'panOnScrollMode',
    'zoomOnScroll',
    'zoomOnPinch',
    'zoomOnDoubleClick',
    'selectNodesOnDrag',
    'elevateNodesOnSelect',
    'connectOnClick',
    'connectionMode',
    'zIndexMode',
  ],
  connectionLine: [
    'connectionRadius',
    'connectionLineType',
    'connectionLineStyle',
    'connectionLineComponent',
    'connectionLineContainerStyle',
  ],
  keyboard: [
    'deleteKeyCode',
    'selectionKeyCode',
    'multiSelectionKeyCode',
    'zoomActivationKeyCode',
    'panActivationKeyCode',
    'disableKeyboardA11y',
  ],
};

export type ReactFlowAPIPropsGroup = keyof typeof FIELDS | 'common';

export function getReactFlowAPIPropsType(group: keyof typeof FIELDS | 'common'): string {
  let myType: string;
  if (group === 'common') {
    const omittedFields = Object.values(FIELDS)
      .flat()
      .map((v) => `"${v}"`)
      .join('|');
    const groupedProps = "Omit<React.ComponentProps<'div'>, 'onError'>";

    myType = `
Omit<
  ReactFlowProps,
  ${omittedFields} | keyof ${groupedProps}
> &
{ '...props': ${groupedProps} }`;
  } else {
    const pickedFields = FIELDS[group].map((v) => `"${v}"`).join('|');
    myType = `Pick<ReactFlowProps, ${pickedFields}>`;
  }

  return myType;
}

export function getReactFlowAPIPropsCode(group: keyof typeof FIELDS | 'common'): string {
  const myType = getReactFlowAPIPropsType(group);
  return `
import type { ReactFlow } from '@xyflow/react'

type ReactFlowProps = React.ComponentProps<typeof ReactFlow>

type $ = ${myType}

export default $`;
}

export const ReactFlowAPIProps: FC<{ group: keyof typeof FIELDS | 'common' }> = ({
  group,
}) => {
  return <APIDocs code={getReactFlowAPIPropsCode(group)} />;
};
