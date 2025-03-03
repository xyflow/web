import { Background, ReactFlow } from "@xyflow/react";

import { $CAMELCOMPONENT } from "@/registry/components/$COMPONENT";

const defaultNodes = [
  {
    id: "1",
    position: { x: 200, y: 200 },
    data: { label: "Node" },
  },
];

export default function $CAMELCOMPONENTDemo() {
  return (
    <div className="h-full w-full">
      <ReactFlow defaultNodes={defaultNodes} fitView>
        <Background />
      </ReactFlow>
    </div>
  );
}
