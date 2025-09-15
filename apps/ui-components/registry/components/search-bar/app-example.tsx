import { Background, Node, Edge, ReactFlow, useReactFlow } from "@xyflow/react";
import { SearchBar } from "@/registry/components/search-bar/";
import { useCallback } from "react";

const graphSize = 20;

const initNodes = Array<Node>(graphSize)
  .fill(0)
  .map((_, index) => ({
    id: `node-${index}`,
    data: { label: `Node ${index}` },
    position: { x: Math.random() * 1000, y: Math.random() * 1000 },
  }));

const initEdges = Array<Edge>(graphSize)
  .fill(0)
  .map((_, index) => ({
    id: `edge-${index}`,
    source: `node-${Math.floor(Math.random() * graphSize)}`,
    target: `node-${Math.floor(Math.random() * graphSize)}`,
  }));

export default function App() {
  const onSearch = (nodes: Node[], searchString: string) => {
    console.log(searchString);
    console.log(nodes);

    return nodes.filter((node) =>
      node.data.label.toLowerCase().includes(searchString.toLowerCase()),
    );
  };
  const { fitView, setNodes } = useReactFlow();

  const onSelectNode = useCallback(
    (node: Node) => {
      setNodes((nodes) =>
        nodes.map((n) => (n.id === node.id ? { ...n, selected: true } : n)),
      );
      fitView({ nodes: [node], duration: 500 });
    },
    [fitView, setNodes],
  );

  return (
    <div className="h-full w-full">
      <ReactFlow defaultNodes={initNodes} defaultEdges={initEdges} fitView>
        <Background />
        <SearchBar
          position="top-left"
          onSearch={onSearch}
          onSelectNode={onSelectNode}
        />
      </ReactFlow>
    </div>
  );
}
