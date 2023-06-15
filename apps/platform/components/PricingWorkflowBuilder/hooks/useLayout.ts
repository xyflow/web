// @ts-nocheck
import { useEffect, useRef } from 'react';
import { useReactFlow, useStore, Node } from 'reactflow';
import { stratify, tree } from 'd3-hierarchy';
import { timer } from 'd3-timer';

const layout = tree<Node>()
  .nodeSize([200, 150])
  .separation(() => 1);

const options = { duration: 300 };

function layoutNodes(nodes, edges) {
  if (nodes.length === 0) {
    return [];
  }

  const hierarchy = stratify<Node>()
    .id((d) => d.id)
    .parentId((d) => edges.find((e) => e.target === d.id)?.source)(nodes);

  const root = layout(hierarchy);
  return root.descendants().map((d) => ({ ...d.data, position: { x: d.x, y: d.y } }));
}

const nodesLengthSelector = (state) => state.nodeInternals.size;

function useLayout() {
  const initial = useRef(true);
  const nodesLength = useStore(nodesLengthSelector);
  const { getNodes, getNode, setNodes, setEdges, getEdges, fitView } = useReactFlow();

  useEffect(() => {
    const nodes = getNodes();
    const edges = getEdges();

    const targetNodes = layoutNodes(nodes, edges);

    const transitions = targetNodes.map((node) => {
      return {
        id: node.id,
        from: getNode(node.id)?.position || node.position,
        to: node.position,
        node,
      };
    });

    const t = timer((elapsed) => {
      const s = elapsed / options.duration;

      const currNodes = transitions.map(({ node, from, to }) => {
        return {
          id: node.id,
          position: node.data.added
            ? {
                x: to.x,
                y: to.y,
              }
            : {
                x: from.x + (to.x - from.x) * s,
                y: from.y + (to.y - from.y) * s,
              },
          data: { ...node.data, added: false },
          type: node.type,
        };
      });

      setNodes(currNodes);

      if (elapsed > options.duration) {
        const finalNodes = transitions.map(({ node, to }) => {
          return {
            id: node.id,
            position: {
              x: to.x,
              y: to.y,
            },
            data: { ...node.data, added: false },
            type: node.type,
          };
        });

        setNodes(finalNodes);

        t.stop();

        if (!initial.current) {
          fitView({ duration: 200, padding: 0.2 });
        }
        initial.current = false;
      }
    });

    return () => {
      t.stop();
    };
  }, [nodesLength, getEdges, getNodes, getNode, setNodes, fitView, setEdges]);
}

export default useLayout;
