import { Background, ReactFlow } from "@xyflow/react";

import { BaseNodeFullDemo, BaseNodeSimpleDemo } from "./component-example";

const nodeTypes = {
  baseNodeSimple: BaseNodeSimpleDemo,
  baseNodeFull: BaseNodeFullDemo,
};

const defaultNodes = [
  {
    id: "1",
    position: { x: 0, y: 200 },
    data: {},
    type: "baseNodeSimple",
  },
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
