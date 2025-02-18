import { Background, ReactFlow } from "@xyflow/react";

import NodeStatusIndicatorDemo from "./component-example";

const defaultNodes = [
  {
    id: "1",
    position: { x: 200, y: 200 },
    data: { label: "Node" },
    type: "nodeStatusIndicatorDemo",
  },
];

const nodeTypes = {
  nodeStatusIndicatorDemo: NodeStatusIndicatorDemo,
};

export default function App() {
  return (
    <div className="h-full w-full">
      <ReactFlow defaultNodes={defaultNodes} nodeTypes={nodeTypes} fitView>
        <Background />
      </ReactFlow>
    </div>
  );
}
