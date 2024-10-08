import { useMemo } from 'react';
import { ReactFlow, Background, BackgroundVariant } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const SLIDE_WIDTH = 100;
const SLIDE_HEIGHT = 100;
const SLIDE_PADDING = 10;

function Slide({ id }) {
  const style = { width: `${SLIDE_WIDTH}px`, height: `${SLIDE_HEIGHT}px` };

  return (
    <div className="slide" style={style}>
      {id}
    </div>
  );
}

export default function Flow({ slides }) {
  const nodeTypes = useMemo(() => ({ slide: Slide }), []);
  const { nodes, edges } = useMemo(() => {
    const stack = [{ id: '1', position: { x: 0, y: 0 } }];
    const visited = new Set();
    const nodes = [];
    const edges = [];

    while (stack.length) {
      const { id, position } = stack.pop();
      const data = slides[id];
      // remember to add `type: 'slide'` to the node!
      const node = { id, type: 'slide', position, data };

      nodes.push(node);
      visited.add(id);

      if (!data) continue;
      if (data.left && !visited.has(data.left)) {
        // a node on left we haven't seen means we need to subtract SLIDE_WIDTH
        // from the current position
        const nextPosition = {
          x: position.x - SLIDE_WIDTH - SLIDE_PADDING,
          y: position.y,
        };

        stack.push({ id: data.left, position: nextPosition });
        edges.push({
          id: `${id}->${data.left}`,
          source: id,
          target: data.left,
        });
      }

      if (data.right && !visited.has(data.right)) {
        const nextPosition = {
          x: position.x + SLIDE_WIDTH + SLIDE_PADDING,
          y: position.y,
        };

        stack.push({ id: data.right, position: nextPosition });
        edges.push({
          id: `${id}->${data.right}`,
          source: id,
          target: data.right,
        });
      }

      if (data.up && !visited.has(data.up)) {
        const nextPosition = {
          x: position.x,
          y: position.y - SLIDE_HEIGHT - SLIDE_PADDING,
        };

        stack.push({ id: data.up, position: nextPosition });
        edges.push({ id: `${id}->${data.up}`, source: id, target: data.up });
      }

      if (data.down && !visited.has(data.down)) {
        const nextPosition = {
          x: position.x,
          y: position.y + SLIDE_HEIGHT + SLIDE_PADDING,
        };

        stack.push({ id: data.down, position: nextPosition });
        edges.push({
          id: `${id}->${data.down}`,
          source: id,
          target: data.down,
        });
      }
    }

    return { nodes, edges };
  }, [slides]);

  return (
    <ReactFlow nodes={nodes} nodeTypes={nodeTypes} edges={edges} fitView>
      <Background color="#f2f2f2" variant={BackgroundVariant.Lines} />
    </ReactFlow>
  );
}
