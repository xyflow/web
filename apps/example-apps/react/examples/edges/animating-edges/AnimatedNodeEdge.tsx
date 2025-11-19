import { useEffect, useMemo } from 'react';
import {
  BaseEdge,
  getBezierPath,
  useReactFlow,
  type Edge,
  type EdgeProps,
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
    // This property is fairly new and not all versions of TypeScript have it
    // in the lib.dom.d.ts file. If you get an error here, you can either
    // ignore it or add the property to the CSSStyleDeclaration interface
    // yourself.
    //
    // @ts-expect-error
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
