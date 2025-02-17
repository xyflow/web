import { Background, ReactFlow } from "@xyflow/react";
import { ZoomSelect } from "@/registry/components/zoom-select/";

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
        <ZoomSelect position="top-left" />
      </ReactFlow>
    </div>
  );
}
