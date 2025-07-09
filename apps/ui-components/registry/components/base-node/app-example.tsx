import { Background, ReactFlow } from "@xyflow/react";

import { BaseNodeFullDemo } from "./component-example";

const nodeTypes = {
  baseNodeFull: BaseNodeFullDemo,
};

const defaultNodes = [
  {
    id: "2",
    position: { x: 200, y: 200 },
    data: {},
    type: "baseNodeFull",
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
