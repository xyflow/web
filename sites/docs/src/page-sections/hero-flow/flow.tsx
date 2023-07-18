import {
  useEffect,
  useState,
  useRef,
  MutableRefObject,
  CSSProperties,
} from 'react';
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';
import cn from 'clsx';

import HeroNode from './hero-node';
import ColorPickerNode from './color-picker-node';
import SliderNode from './slider-node';
import SwitcherNode from './switcher-node';
import SwoopyNode from './swoopy-node';
import { Framework } from '@/types';
import { getColorBySite } from '@/utils';

const nodeTypes = {
  hero: HeroNode,
  colorpicker: ColorPickerNode,
  slider: SliderNode,
  switcher: SwitcherNode,
  swoopy: SwoopyNode,
};

const nodeStyle = {};
const isMobileFlow = typeof window !== 'undefined' && window.innerWidth < 992;
const isLargeFlow = typeof window !== 'undefined' && window.innerWidth > 1250;

const proOptions = {
  hideAttribution: true,
};

function getNodePositions(headlineBounds) {
  const px = window.innerWidth * 0.05;
  const rfHeight = window.innerHeight * 0.8;
  const rfWidth = window.innerWidth;

  if (isMobileFlow) {
    const offsetY =
      headlineBounds.top +
      headlineBounds.height +
      (rfHeight - headlineBounds.height) / 2 -
      125;

    return {
      hero: { x: rfWidth - 150 - px, y: offsetY + 15 },
      shape: { x: px + px / 4, y: offsetY + 15 },
      color: { x: px / 2, y: offsetY + 90 },
      zoom: { x: px, y: offsetY + 170 },
      swoopy1: { x: 40, y: -40 },
      swoopy2: { x: 160, y: 40 },
    };
  }

  if (isLargeFlow) {
    const offsetX = window.innerWidth / 2;
    const offsetY = headlineBounds.top + 25;

    return {
      hero: { x: offsetX + 340, y: offsetY },
      shape: { x: offsetX - 50, y: offsetY - 60 },
      color: { x: offsetX - 150, y: offsetY + 80 },
      zoom: { x: offsetX - 20, y: offsetY + 220 },
      swoopy1: { x: 75, y: -35 },
      swoopy2: { x: 160, y: 40 },
    };
  }

  const offsetX = headlineBounds.left + headlineBounds.width + px;
  const offsetY = rfHeight / 2 - 150;

  return {
    hero: { x: rfWidth - px - 180, y: offsetY + 20 },
    shape: { x: offsetX, y: offsetY - 10 },
    color: { x: offsetX, y: offsetY + 100 },
    zoom: { x: offsetX, y: offsetY + 200 },
    swoopy1: { x: 75, y: -35 },
    swoopy2: { x: 160, y: 40 },
  };
}

const defaultNodes = [];

const defaultEdges = [
  {
    id: 'color->hero',
    source: 'color',
    target: 'hero',
    targetHandle: 'color',
    style: {
      stroke: '#A3ADB8',
      strokeWidth: 1.5,
    },
    animated: true,
  },
  {
    id: 'zoom->hero',
    source: 'zoom',
    target: 'hero',
    targetHandle: 'zoom',
    style: {
      stroke: '#A3ADB8',
      strokeWidth: 1.5,
    },
    animated: true,
  },
  {
    id: 'shape->hero',
    source: 'shape',
    target: 'hero',
    targetHandle: 'shape',
    style: {
      stroke: '#A3ADB8',
      strokeWidth: 1.5,
    },
    animated: true,
  },
];

type FlowProps = {
  variant: Framework;
  headlineRef: MutableRefObject<HTMLDivElement>;
};

const bgClass = {
  react: 'bg-reactflow-gradient',
  svelte: 'bg-svelteflow-gradient',
};

function Flow({ variant, headlineRef }: FlowProps) {
  const { setNodes } = useReactFlow();
  const reactFlowRef = useRef(null);
  const [headlineDimensions, setHeadlineDimensions] = useState(null);
  const [color, setColor] = useState(getColorBySite(variant));
  const [zoom, setZoom] = useState(12);
  const [shape, setShape] = useState('cube');

  useEffect(() => {
    if (headlineRef?.current && reactFlowRef.current) {
      const headlineBbox = headlineRef.current.getBoundingClientRect();
      const rfBbox = reactFlowRef.current.getBoundingClientRect();
      setHeadlineDimensions({
        top: headlineBbox.top - rfBbox.top,
        left: headlineBbox.left - rfBbox.left,
        width: headlineBbox.width,
        height: headlineBbox.height,
      });
    }
  }, []);

  useEffect(() => {
    if (!headlineDimensions) {
      return;
    }

    const nodePositions = getNodePositions(headlineDimensions);

    setNodes([
      {
        id: 'hero',
        type: 'hero',
        position: nodePositions.hero,
        style: { width: isLargeFlow ? 300 : 160, ...nodeStyle },
        data: { color, zoom, shape, label: 'output', variant },
      },
      {
        id: 'color',
        type: 'colorpicker',
        data: { color, onChange: setColor, label: 'shape color', variant },
        style: { ...nodeStyle, width: 150 },
        position: nodePositions.color,
      },
      {
        id: 'zoom',
        type: 'slider',
        data: {
          value: zoom,
          min: 0,
          max: 40,
          onChange: setZoom,
          label: 'zoom level',
          variant,
        },
        style: { ...nodeStyle, width: 150 },
        position: nodePositions.zoom,
      },
      {
        id: 'shape',
        type: 'switcher',
        data: {
          value: shape,
          options: ['cube', 'pyramid'],
          onChange: setShape,
          label: 'shape type',
          variant,
        },
        style: { ...nodeStyle, width: 150 },
        position: nodePositions.shape,
      },
      {
        id: 'swoopy1',
        type: 'swoopy',
        draggable: false,
        data: { label: 'custom node' },
        position: nodePositions.swoopy1,
        parentNode: 'shape',
      },
      {
        id: 'swoopy2',
        type: 'swoopy',
        draggable: false,
        data: { label: 'animated edge', swoopyDir: 'top' },
        position: nodePositions.swoopy2,
        parentNode: 'zoom',
      },
    ]);
  }, [headlineDimensions]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === 'color') {
          n.data = { ...n.data, value: color };
        }
        if (n.id === 'hero') {
          n.data = { ...n.data, color };
        }
        return n;
      })
    );
  }, [color]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === 'zoom') {
          n.data = { ...n.data, value: zoom };
        }
        if (n.id === 'hero') {
          n.data = { ...n.data, zoom };
        }
        return n;
      })
    );
  }, [zoom]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === 'shape') {
          n.data = { ...n.data, value: shape };
        }
        if (n.id === 'hero') {
          n.data = { ...n.data, shape };
        }
        return n;
      })
    );
  }, [shape]);

  return (
    <div className="h-[65vh] xl:h-[60vh] 2xl:h-[50vh]">
      <ReactFlow
        preventScrolling={false}
        zoomOnScroll={false}
        nodeTypes={nodeTypes}
        defaultNodes={defaultNodes}
        defaultEdges={defaultEdges}
        ref={reactFlowRef}
        proOptions={proOptions}
        className={cn(
          'bg-no-repeat bg-[65%_center] bg-[length:35%]',
          bgClass[variant]
        )}
      >
        <Controls showInteractive={false} className="bg-white" />
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
