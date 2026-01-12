'use client';

import { useCallback, useEffect, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  ReactFlowProvider,
  useReactFlow,
  Node,
  Edge,
  useStoreApi,
  useStore,
  ReactFlowState,
  getNodesBounds,
  useNodesInitialized,
} from '@xyflow/react';

import HeroNode from './hero-node';
import ColorPickerNode from './color-picker-node';
import SliderNode from './slider-node';
import SwitcherNode from './switcher-node';
import SwoopyNode from './swoopy-node';

const nodeTypes = {
  hero: HeroNode,
  colorpicker: ColorPickerNode,
  slider: SliderNode,
  switcher: SwitcherNode,
  swoopy: SwoopyNode,
};

const proOptions = {
  hideAttribution: true,
};

const getInitialNodes = (initialColor: string = '#ff0071') =>
  [
    {
      id: 'hero',
      type: 'hero',
      position: { x: 390, y: 50 },
      data: { label: 'output' },
      className: 'w-[200px] lg:w-[300px]',
      style: { opacity: 0 },
    },
    {
      id: 'color',
      type: 'colorpicker',
      position: { x: 50, y: 0 },
      data: { value: initialColor, label: 'shape color' },
      className: 'w-[150px]',
      style: { opacity: 0 },
    },
    {
      id: 'shape',
      type: 'switcher',
      position: { x: 0, y: 125 },
      data: {
        value: 'cube',
        label: 'shape type',
      },
      className: 'w-[150px]',
      style: { opacity: 0 },
    },
    {
      id: 'zoom',
      type: 'slider',
      position: { x: 40, y: 280 },
      data: {
        value: 12,
        label: 'zoom level',
      },
      className: 'w-[150px]',
      style: { opacity: 0 },
    },
  ] satisfies Node[];

const defaultEdges: Edge[] = [
  {
    id: 'color->hero',
    source: 'color',
    target: 'hero',
    targetHandle: 'color',
    style: {
      stroke: '#D2D2D2',
      strokeWidth: 2,
      opacity: 0,
    },
    animated: true,
  },
  {
    id: 'shape->hero',
    source: 'shape',
    target: 'hero',
    targetHandle: 'shape',
    style: {
      stroke: '#D2D2D2',
      strokeWidth: 2,
      opacity: 0,
    },
    animated: true,
  },
  {
    id: 'zoom->hero',
    source: 'zoom',
    target: 'hero',
    targetHandle: 'zoom',
    style: {
      stroke: '#D2D2D2',
      strokeWidth: 2,
      opacity: 0,
    },
    animated: true,
  },
];

type FlowProps = {
  initialColor?: string;
  className?: string;
};

const viewportWidthSelector = (state: ReactFlowState) => state.width;

function Flow({ className, initialColor }: FlowProps) {
  const { getNodes, setNodes, setEdges, setViewport } = useReactFlow();
  const viewportWidth = useStore(viewportWidthSelector);
  const store = useStoreApi();

  const defaultNodes = useMemo(() => getInitialNodes(initialColor), [initialColor]);

  const adjustViewport = useCallback(() => {
    const nodes = getNodes();
    const { width, height, nodeLookup } = store.getState();
    const {
      x: xMin,
      y: yMin,
      width: xMax,
      height: yMax,
    } = getNodesBounds(nodes, { nodeLookup });

    const zoom = width < 1240 ? (width < 500 ? 0.65 : 0.8) : 1;
    const mobileView = width < 1024;
    const flowWidth = (xMax - xMin) * zoom;
    const flowHeight = (yMax - yMin) * zoom;
    const navWidth = Math.min(width - 70, 1200);
    const viewportX = mobileView
      ? width / 2 - flowWidth / 2
      : width - flowWidth - (width - navWidth) / 2;
    const viewportY = mobileView ? height - flowHeight - 20 : height / 2 - flowHeight / 2;

    setViewport({ x: viewportX, y: viewportY, zoom });
  }, [setViewport, getNodes, store]);

  const onInit = useCallback(() => {
    adjustViewport();
    setNodes((nds) => nds.map((n) => ({ ...n, style: { ...n.style, opacity: 1 } })));
    setEdges((eds) => eds.map((e) => ({ ...e, style: { ...e.style, opacity: 1 } })));
  }, [setNodes, setEdges, adjustViewport]);

  // Retrigger viewport adjustment when nodes are initialized
  // Fixes: https://github.com/xyflow/web/issues/844
  const nodesInitialized = useNodesInitialized();
  useEffect(() => {
    adjustViewport();
  }, [viewportWidth, nodesInitialized, adjustViewport]);

  return (
    <div className="w-full h-full bg-gradient bg-no-repeat bg-[center_120px] lg:bg-[65%_center] lg:bg-[length:35%]">
      <ReactFlow
        preventScrolling={false}
        zoomOnScroll={false}
        nodeTypes={nodeTypes}
        defaultNodes={defaultNodes}
        defaultEdges={defaultEdges}
        proOptions={proOptions}
        panOnDrag={viewportWidth > 1024}
        className={className}
        onInit={onInit}
        id="hero"
        autoPanOnNodeDrag={false}
        autoPanOnConnect={false}
      >
        <Background />
      </ReactFlow>
    </div>
  );
}

export default function Wrapper(props: FlowProps) {
  return (
    <ReactFlowProvider>
      <Flow {...props} />
    </ReactFlowProvider>
  );
}
