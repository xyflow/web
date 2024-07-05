import React, {
  KeyboardEventHandler,
  useCallback,
  useMemo,
  useState,
} from 'react';
import ReactFlow, {
  Node,
  useReactFlow,
  ReactFlowProvider,
  NodeMouseHandler,
} from 'reactflow';

import slides from './slides';
import './index.css';

// we need to import the React Flow styles to make it work
import 'reactflow/dist/style.css';
import {
  Slide,
  SlideData,
  SLIDE_WIDTH,
  SLIDE_HEIGHT,
  SLIDE_PADDING,
} from './Slide';

const slidesToElements = () => {
  const start = Object.keys(slides)[0];
  const stack = [{ id: start, position: { x: 0, y: 0 } }];
  const visited = new Set();
  const nodes = [];
  const edges = [];

  while (stack.length) {
    const { id, position } = stack.pop();
    const slide = slides[id];
    const node = {
      id,
      type: 'slide',
      position,
      data: slide,
      draggable: false,
    } satisfies Node<SlideData>;

    if (slide.left && !visited.has(slide.left)) {
      const nextPosition = {
        x: position.x - (SLIDE_WIDTH + SLIDE_PADDING),
        y: position.y,
      };

      stack.push({ id: slide.left, position: nextPosition });
      edges.push({
        id: `${id}->${slide.left}`,
        source: id,
        target: slide.left,
      });
    }

    if (slide.up && !visited.has(slide.up)) {
      const nextPosition = {
        x: position.x,
        y: position.y - (SLIDE_HEIGHT + SLIDE_PADDING),
      };

      stack.push({ id: slide.up, position: nextPosition });
      edges.push({ id: `${id}->${slide.up}`, source: id, target: slide.up });
    }

    if (slide.down && !visited.has(slide.down)) {
      const nextPosition = {
        x: position.x,
        y: position.y + (SLIDE_HEIGHT + SLIDE_PADDING),
      };

      stack.push({ id: slide.down, position: nextPosition });
      edges.push({
        id: `${id}->${slide.down}`,
        source: id,
        target: slide.down,
      });
    }

    if (slide.right && !visited.has(slide.right)) {
      const nextPosition = {
        x: position.x + (SLIDE_WIDTH + SLIDE_PADDING),
        y: position.y,
      };

      stack.push({ id: slide.right, position: nextPosition });
      edges.push({
        id: `${id}->${slide.down}`,
        source: id,
        target: slide.down,
      });
    }

    nodes.push(node);
    visited.add(id);
  }

  return { start, nodes, edges };
};

const nodeTypes = {
  slide: Slide,
};

function Flow() {
  const { fitView } = useReactFlow();
  const { start, nodes, edges } = useMemo(() => slidesToElements(), []);
  const [currentSlide, setCurrentSlide] = useState(start);

  const handleKeyPress = useCallback<KeyboardEventHandler>(
    (event) => {
      const slide = slides[currentSlide];

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          if (slide.left) {
            setCurrentSlide(slide.left);
            fitView({ nodes: [{ id: slide.left }], duration: 150 });
          }

          break;

        case 'ArrowUp':
          event.preventDefault();
          if (slide.up) {
            setCurrentSlide(slide.up);
            fitView({ nodes: [{ id: slide.up }], duration: 150 });
          }

          break;

        case 'ArrowDown':
          event.preventDefault();
          if (slide.down) {
            setCurrentSlide(slide.down);
            fitView({ nodes: [{ id: slide.down }], duration: 150 });
          }

          break;

        case 'ArrowRight':
          event.preventDefault();
          if (slide.right) {
            setCurrentSlide(slide.right);
            fitView({ nodes: [{ id: slide.right }], duration: 150 });
          }

          break;
      }
    },
    [nodes, currentSlide],
  );

  const handleNodeClick = useCallback<NodeMouseHandler>(
    (_, node) => {
      if (node.id !== currentSlide) {
        setCurrentSlide(node.id);
        fitView({ nodes: [{ id: node.id }], duration: 150 });
      }
    },
    [currentSlide],
  );

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      edges={edges}
      fitView
      fitViewOptions={{ nodes: [{ id: start }] }}
      minZoom={0.1}
      onKeyDown={handleKeyPress}
      onNodeClick={handleNodeClick}
    ></ReactFlow>
  );
}

export default () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
);
