import { Background, ReactFlow } from "@xyflow/react";
import NodeTooltipDemo from "./component-example";

const nodeTypes = {
  nodeTooltip: NodeTooltipDemo,
};

const defaultNodes = [
  {
    id: "1",
    position: { x: 200, y: 200 },
    data: {},
    type: "nodeTooltip",
  },
];

export default function App() {
  return (
    <div className="h-full w-full">
      <ReactFlow defaultNodes={defaultNodes} nodeTypes={nodeTypes} fitView>
        <Background />
      </ReactFlow>
    </div>
  );
}
