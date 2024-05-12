import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ReactFlowState,
  useStore,
  Node,
  useReactFlow,
  useUpdateNodeInternals,
} from 'reactflow';
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceX,
  forceY,
  SimulationNodeDatum,
  SimulationLinkDatum,
} from 'd3-force';

// FOCUS -----------------------------------------------------------------------

export type FocusParams = {
  id: string;
  includeChildren?: boolean;
  duration?: number;
  then?: [number, () => void][];
};

export const useFocus = ({
  id,
  includeChildren,
  duration = 500,
  then,
}: FocusParams) => {
  const { getNodes, fitView } = useReactFlow();
  const predelay = 50;

  useEffect(() => {
    let actions = then ? [...then] : [];
    let timer = window.setTimeout(() => {
      fitView({
        padding: 0.5,
        duration: duration,
        includeHiddenNodes: true,
        nodes: includeChildren
          ? getNodes().filter((node) => node.id.startsWith(id))
          : [{ id }],
      });

      const next = () => {
        if (!actions.length) return;
        const [delay, action] = actions.shift();

        timer = window.setTimeout(() => {
          action();
          next();
        }, delay);
      };

      timer = window.setTimeout(next, duration);
    }, predelay);

    return () => window.clearTimeout(timer);
  }, [id, fitView]);
};

// FORCE LAYOUT ----------------------------------------------------------------

export type ForceLayoutParams = {
  rootId: string;
  strength?: number;
  distance?: number;
};

type SimNodeType = SimulationNodeDatum & Node;

function useForceLayout({
  rootId,
  strength = -1000,
  distance = 150,
}: ForceLayoutParams) {
  const { setNodes, getNodes, getEdges } = useReactFlow();
  const nodesInitialised = useStore((s) =>
    s.getNodes().some((node) => node.id.startsWith(rootId)),
  );
  const [running, setRunning] = useState(false);
  const nodeInternals = useStore((s) => s.nodeInternals);
  const updateNodeInternals = useUpdateNodeInternals();
  const simulation = useMemo(() => {
    if (!nodesInitialised) return forceSimulation<SimNodeType>().stop();

    const simulationNodes: SimNodeType[] = getNodes().flatMap((node) =>
      node.id.startsWith(rootId)
        ? [
            {
              ...node,
              x: node.position.x,
              y: node.position.y,
            },
          ]
        : [],
    );

    const simulationEdges: SimulationLinkDatum<SimNodeType>[] = getEdges().map(
      (edge) => edge,
    );

    return forceSimulation<SimNodeType>()
      .stop()
      .nodes(simulationNodes)
      .force('charge', forceManyBody().strength(strength))
      .force(
        'link',
        forceLink(simulationEdges)
          .id((d: any) => d.id)
          .strength(0.05)
          .distance(distance),
      )
      .force('x', forceX().x(0).strength(0.08))
      .force('y', forceY().y(0).strength(0.08));
  }, [
    nodesInitialised,
    rootId,
    strength,
    distance,
    nodeInternals,
    getNodes,
    getEdges,
    setNodes,
  ]);

  useEffect(() => {
    if (!running) return;

    let id = window.requestAnimationFrame(function tick() {
      const idsToUpdate = [];

      simulation.tick();
      for (const { id, x, y } of simulation.nodes()) {
        const node = nodeInternals.get(id);

        idsToUpdate.push(id);
        nodeInternals.set(id, { ...node, position: { x, y } });
      }

      updateNodeInternals(idsToUpdate);
      id = window.requestAnimationFrame(tick);
    });

    return () => window.cancelAnimationFrame(id);
  });

  const start = useCallback(() => {
    setRunning(true);
  }, []);

  const stop = useCallback(() => {
    setRunning(false);
    simulation.stop();
  }, [simulation]);

  return { start, stop };
}

export default useForceLayout;
