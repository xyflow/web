import { Background, Controls, ReactFlow } from "@xyflow/react";

export default function Home() {
  return (
    <div className="h-full w-full">
      <ReactFlow>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
