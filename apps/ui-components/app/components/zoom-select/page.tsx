import { Background, ReactFlow } from "@xyflow/react";
import ZoomSelectDemo from "@/registry/components/zoom-select/demo";

const defaultNodes = [
  {
    id: "1",
    position: { x: 200, y: 200 },
    data: { label: "Node" },
  },
];

export default function DemoPage() {
  return (
    <div className="h-full w-full">
      <ReactFlow defaultNodes={defaultNodes} fitView>
        <Background />
        <ZoomSelectDemo />
      </ReactFlow>
    </div>
  );
}
