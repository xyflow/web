import { Background, Panel, ReactFlow } from "@xyflow/react";
import { ZoomSlider } from "@/registry/components/zoom-slider/";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const defaultNodes = [
  {
    id: "1",
    position: { x: 200, y: 200 },
    data: { label: "Node" },
  },
];

export default function App() {
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    "horizontal",
  );

  return (
    <div className="h-full w-full">
      <ReactFlow defaultNodes={defaultNodes} fitView>
        <Background />
        <ZoomSlider position="top-left" orientation={orientation} />
        <Panel position="bottom-right">
          <Button
            onClick={() =>
              setOrientation(
                orientation === "horizontal" ? "vertical" : "horizontal",
              )
            }
          >
            Toggle orientation
          </Button>
        </Panel>
      </ReactFlow>
    </div>
  );
}
