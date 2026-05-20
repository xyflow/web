import { NodeSearch } from "@/registry/components/node-search/";
import { Background, Node, Panel, ReactFlow } from "@xyflow/react";

type NodeData = {
  label: string;
};

const graphSize = 20;

const initNodes: Node<NodeData>[] = Array.from(
  { length: graphSize },
  (_, index) => {
    // Calculate grid dimensions (aim for roughly square grid)
    const cols = Math.ceil(Math.sqrt(graphSize));
    // const rows = Math.ceil(graphSize / cols);

    // Calculate position in grid
    const col = index % cols;
    const row = Math.floor(index / cols);

    // Grid spacing
    const spacing = 200;
    const startX = 100;
    const startY = 100;

    return {
      id: `node-${index}`,
      data: { label: `Node ${index}` },
      position: {
        x: startX + col * spacing,
        y: startY + row * spacing,
      },
    };
  },
);

export default function App() {
  return (
    <div className="h-full w-full">
      <ReactFlow defaultNodes={initNodes} defaultEdges={[]} fitView>
        <Background />
        <Panel
          className="bg-primary-foreground text-foreground flex gap-1 rounded-md p-1"
          position="top-left"
        >
          <NodeSearch />
        </Panel>
      </ReactFlow>
    </div>
  );
}
