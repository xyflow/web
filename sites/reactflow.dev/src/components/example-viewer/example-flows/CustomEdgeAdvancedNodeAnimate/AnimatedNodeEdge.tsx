import React, { useEffect, useMemo } from 'react';
import {
  BaseEdge,
  Edge,
  EdgeProps,
  getBezierPath,
  useReactFlow,
} from '@xyflow/react';

export type AnimatedNodeEdge = Edge<{ node: string }, 'animatedNode'>;

export function AnimatedNodeEdge({
  id,
  data = { node: '' },
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
}: EdgeProps<AnimatedNodeEdge>) {
  const { getNode, updateNode } = useReactFlow();
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const selector = useMemo(
    () => `.react-flow__node[data-id="${data.node}"]`,
    [data.node],
  );

  useEffect(() => {
    const node = document.querySelector(selector) as HTMLElement;

    if (!node) return;

    node.style.offsetPath = `path('${edgePath}')`;
    node.style.offsetRotate = '0deg';
    node.style.offsetAnchor = 'center';

    let wasDraggable = getNode(data.node).draggable;

    updateNode(data.node, { draggable: false });

    return () => {
      node.style.offsetPath = 'none';
      updateNode(data.node, { draggable: wasDraggable });
    };
  }, [selector, edgePath]);

  useEffect(() => {
    const node = document.querySelector(selector) as HTMLElement;

    if (!node) return;

    const keyframes = [{ offsetDistance: '0%' }, { offsetDistance: '100%' }];
    const animation = node.animate(keyframes, {
      duration: 2000,
      direction: 'alternate',
      iterations: Infinity,
    });

    return () => {
      animation.cancel();
    };
  }, [selector]);

  return <BaseEdge id={id} path={edgePath} />;
}
