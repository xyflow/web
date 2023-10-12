'use client';

import { useCallback, useState, useEffect, MutableRefObject } from 'react';
import ReactFlow, {
  Background,
  ReactFlowProvider,
  useReactFlow,
  Node,
  Edge,
  useStoreApi,
  useStore,
  ReactFlowState,
} from 'reactflow';
import { cn } from '../../..';

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

const initialState = {
  color: '#777',
  zoom: 12,
  shape: 'cube',
};

const defaultNodes: Node[] = [
  {
    id: 'hero',
    type: 'hero',
    position: { x: 390, y: 50 },
    data: { ...initialState, label: 'output' },
    className: 'w-[200px] lg:w-[300px]',
    style: { opacity: 0 },
  },
  {
    id: 'color',
    type: 'colorpicker',
    position: { x: 50, y: 0 },
    data: { ...initialState, label: 'shape color' },
    className: 'w-[150px]',
    style: { opacity: 0 },
  },
  {
    id: 'shape',
    type: 'switcher',
    position: { x: 0, y: 125 },
    data: {
      ...initialState,
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
      ...initialState,
      label: 'zoom level',
    },
    className: 'w-[150px]',
    style: { opacity: 0 },
  },
];

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

function Flow({ initialColor = '#777', className }: FlowProps) {
  const { getNodes, setNodes, setEdges, setViewport } = useReactFlow();
  const viewportWidth = useStore(viewportWidthSelector);
  const store = useStoreApi();
  const [flowState, setFlowState] = useState({
    ...initialState,
    color: initialColor,
  });

  const adjustViewport = useCallback(() => {
    const nodes = getNodes();
    const { width, height } = store.getState();
    const xMin = Math.min(...nodes.map((n) => n.position.x));
    const xMax = Math.max(...nodes.map((n) => n.position.x + (n.width ?? 0)));
    const yMin = Math.min(...nodes.map((n) => n.position.y));
    const yMax = Math.max(...nodes.map((n) => n.position.y + (n.height ?? 0)));
    const zoom = width < 1240 ? (width < 500 ? 0.65 : 0.8) : 1;
    const mobileView = width < 1024;
    const flowWidth = (xMax - xMin) * zoom;
    const flowHeight = (yMax - yMin) * zoom;
    const navWidth = Math.min(width - 70, 1200);
    const viewportX = mobileView
      ? width / 2 - flowWidth / 2
      : width - flowWidth - (width - navWidth) / 2;
    const viewportY = mobileView
      ? height - flowHeight - 20
      : height / 2 - flowHeight / 2;

    setViewport({ x: viewportX, y: viewportY, zoom });
  }, [setViewport, getNodes, store]);

  const onInit = useCallback(() => {
    adjustViewport();
    setNodes((nds) =>
      nds.map((n) => ({ ...n, style: { ...n.style, opacity: 1 } })),
    );
    setEdges((eds) =>
      eds.map((e) => ({ ...e, style: { ...e.style, opacity: 1 } })),
    );
  }, [setViewport, getNodes, store]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        data: { ...n.data, ...flowState, setState: setFlowState },
      })),
    );
  }, [flowState]);

  useEffect(() => {
    adjustViewport();
  }, [viewportWidth]);

  return (
    <div className="w-full h-full">
      <ReactFlow
        preventScrolling={false}
        zoomOnScroll={false}
        nodeTypes={nodeTypes}
        defaultNodes={defaultNodes}
        defaultEdges={defaultEdges}
        proOptions={proOptions}
        className={cn(
          'bg-no-repeat bg-[65%_center] bg-[length:35%]',
          className,
        )}
        onInit={onInit}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
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
