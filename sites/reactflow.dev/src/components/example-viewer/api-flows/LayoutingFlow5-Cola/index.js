import * as Cola from 'webcola';
import React, { useMemo } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  useNodesInitialized,
} from '@xyflow/react';

import { initialNodes, initialEdges } from './nodes-edges.js';

import '@xyflow/react/dist/style.css';

const useLayoutedElements = () => {
  const { getNodes, setNodes, getEdges, fitView } = useReactFlow();
  const initialized = useNodesInitialized();

  return useMemo(() => {
    // If React Flow hasn't initialized our nodes with a width and height yet, or
    // if there are no nodes in the flow, then we can't run the simulation!
    if (!initialized || getNodes().length === 0) return [false, {}];

    let running = false;
    let idMap = new Map();
    let nodes = getNodes().map((node, idx) => {
      idMap.set(node.id, idx);

      return { ...node, index: idx, x: node.position.x, y: node.position.y };
    });
    let links = getEdges().map((edge) => {
      const source = idMap.get(edge.source);
      const target = idMap.get(edge.target);

      return { source, target };
    });

    const simulation = new Cola.Layout()
      .nodes(nodes)
      .links(links)
      .symmetricDiffLinkLengths(100)
      // These initial parameters tell Cola how many iterations to run immediately
      // on startup. The bit we care about is that `false` that tells Cold not to
      // run the simulation loop automatically: we want to `tick` it manually!
      .start(1, 1, 1, 1, false, true);

    const tick = () => {
      getNodes().forEach((node, i) => {
        const dragging = Boolean(
          document.querySelector(`[data-id="${node.id}"].dragging`),
        );

        if (dragging && !nodes[i].fixed) {
          Cola.Layout.dragStart(nodes[i]);
        } else if (dragging) {
          Cola.Layout.drag(nodes[i], {
            x: node.position.x,
            y: node.position.y,
          });

          !simulation.alpha() && simulation.resume();
        } else if (nodes[i].fixed) {
          Cola.Layout.dragEnd(nodes[i]);
        }
      });

      simulation.tick();
      setNodes(
        nodes.map((node) => ({ ...node, position: { x: node.x, y: node.y } })),
      );

      window.requestAnimationFrame(() => {
        // Give React and React Flow a chance to update and render the new node
        // positions before we fit the viewport to the new layout.
        fitView();

        // If the simulation hasn't be stopped, schedule another tick.
        if (running) tick();
      });
    };

    const toggle = () => {
      running = !running;

      if (running) {
        !simulation.alpha() && simulation.resume();
        window.requestAnimationFrame(tick);
      }
    };

    const isRunning = () => running;

    return [true, { toggle, isRunning }];
  }, [initialised]);
};

const LayoutFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [initialised, { toggle, isRunning }] = useLayoutedElements();

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
    >
      <Panel>
        {initialised && (
          <button onClick={toggle}>
            {isRunning() ? 'Stop' : 'Start'} force simulation
          </button>
        )}
      </Panel>
    </ReactFlow>
  );
};

export default function () {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  );
}
