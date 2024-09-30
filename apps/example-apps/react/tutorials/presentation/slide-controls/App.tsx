import React, { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  useReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  type Node,
  type NodeMouseHandler,
} from '@xyflow/react';

// we need to import the React Flow styles to make it work
import '@xyflow/react/dist/style.css';

import slides from './slides';
import {
  Slide,
  SLIDE_WIDTH,
  SLIDE_HEIGHT,
  SLIDE_PADDING,
  type SlideData,
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

  const handleNodeClick = useCallback<NodeMouseHandler>(
    (_, node) => {
      fitView({ nodes: [{ id: node.id }], duration: 150 });
    },
    [fitView],
  );

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      edges={edges}
      fitView
      fitViewOptions={{ nodes: [{ id: start }] }}
      minZoom={0.1}
      onNodeClick={handleNodeClick}
    >
      <Background color="#f2f2f2" variant={BackgroundVariant.Lines} />
    </ReactFlow>
  );
}

export default () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
);
