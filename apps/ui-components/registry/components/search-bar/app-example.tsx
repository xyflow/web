import { Background, Node, Edge, ReactFlow, useReactFlow } from "@xyflow/react";
import { SearchBar } from "@/registry/components/search-bar/";
import { useCallback } from "react";

type NodeData = {
  label: string;
};

const graphSize = 20;

const initNodes: Node<NodeData>[] = Array.from(
  { length: graphSize },
  (_, index) => {
    // Calculate grid dimensions (aim for roughly square grid)
    const cols = Math.ceil(Math.sqrt(graphSize));
    const rows = Math.ceil(graphSize / cols);

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
  const onSearch = useCallback(
    (nodes: Node<NodeData>[], searchString: string) =>
      nodes.filter((node) =>
        node.data.label.toLowerCase().includes(searchString.toLowerCase()),
      ),
    [],
  );

  const { fitView, setNodes } = useReactFlow();

  const onSelectNode = useCallback(
    (node: Node<NodeData>) => {
      setNodes((nodes) =>
        nodes.map((n) => (n.id === node.id ? { ...n, selected: true } : n)),
      );
      fitView({ nodes: [node], duration: 500 });
    },
    [fitView, setNodes],
  );

  return (
    <div className="h-full w-full">
      <ReactFlow defaultNodes={initNodes} defaultEdges={[]} fitView>
        <Background />
        <SearchBar
          position="top-left"
          onSearch={(nodes, searchString) =>
            onSearch(nodes as Node<NodeData>[], searchString)
          }
          onSelectNode={(node) => onSelectNode(node as Node<NodeData>)}
        />
      </ReactFlow>
    </div>
  );
}
