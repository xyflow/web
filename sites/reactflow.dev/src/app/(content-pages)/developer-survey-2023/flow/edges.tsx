import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { Button } from 'xy-shared';
import { useCallback, useMemo } from 'react';
import {
  BaseEdge,
  Edge,
  EdgeLabelRenderer,
  EdgeProps,
  getStraightPath,
  useReactFlow,
} from '@xyflow/react';

export const edgeTypes = {
  focus: FocusEdge,
};

export const focusEdge = (
  source: string,
  target: string,
  actions: 'prev' | 'next' | 'both' = 'next',
) => ({
  id: `${source}->${target}`,
  type: 'focus',
  source,
  target,
  data: { actions },
});

export function FocusEdge({
  id,
  source,
  sourceX,
  sourceY,
  target,
  targetX,
  targetY,
  data = { actions: 'both' },
}: EdgeProps<Edge<{ actions: 'prev' | 'next' | 'both' }>>) {
  const { fitView } = useReactFlow();
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const length = useMemo(() => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', edgePath);

    return path.getTotalLength();
  }, [edgePath]);

  const rotation = useMemo(() => {
    const dx = targetX - sourceX;
    const dy = targetY - sourceY;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  }, [sourceX, sourceY, targetX, targetY]);

  const focus = useCallback(
    (id: string) => {
      fitView({
        padding: 0.5,
        duration: 500,
        nodes: [{ id }],
      });
    },
    [fitView],
  );

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          className="flex justify-between nopan"
          style={{
            width: `${length - 512 - 100}px`,
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px) rotate(${rotation}deg)`,
            pointerEvents: 'all',
          }}
        >
          {data.actions === 'next' || data.actions === 'both' ? (
            <Button onClick={() => focus(target)} className="group" variant="secondary">
              <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          ) : (
            <div />
          )}
          {data.actions === 'prev' || data.actions === 'both' ? (
            <Button onClick={() => focus(source)} className="group" variant="secondary">
              <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </Button>
          ) : (
            <div />
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
