import { Background, ReactFlow } from "@xyflow/react";
import PlaceholderNodeDemo from "./component-example";

const nodeTypes = {
  placeholderNode: PlaceholderNodeDemo,
};

const defaultNodes = [
  {
    id: "1",
    data: { label: "Original Node" },
    position: { x: 0, y: 0 },
    type: "default",
  },
  {
    id: "2",
    data: {},
    position: { x: 0, y: 150 },
    type: "placeholderNode",
  },
];

const defaultEdges = [
  {
    id: "1=>2",
    source: "1",
    target: "2",
    type: "default",
    animated: true,
  },
];

export default function App() {
  return (
    <div className="h-full w-full">
      <ReactFlow
        defaultNodes={defaultNodes}
        defaultEdges={defaultEdges}
        nodeTypes={nodeTypes}
        nodeClickDistance={5}
        fitView
      >
        <Background />
      </ReactFlow>
    </div>
  );
}
