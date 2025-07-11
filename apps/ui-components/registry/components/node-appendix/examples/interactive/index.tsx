import { Background, ReactFlow } from "@xyflow/react";

import { InteractiveAppendixDemo } from "./component-example";

const nodeTypes = {
  interactiveAppendix: InteractiveAppendixDemo,
};

const defaultNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: {},
    type: "interactiveAppendix",
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
