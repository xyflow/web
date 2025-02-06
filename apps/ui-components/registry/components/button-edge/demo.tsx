import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
} from "@xyflow/react";

import { Button } from "@/components/ui/button";
import { MousePointerClick } from "lucide-react";
import { ButtonEdge } from "@/registry/components/button-edge";

function EdgeButton() {
  const onEdgeClick = () => {
    window.alert(`Edge has been clicked!`);
  };

  return (
    <Button onClick={onEdgeClick} size="icon" variant="secondary">
      <MousePointerClick size={16} />
    </Button>
  );
}

export function ButtonEdgeDemo(props: EdgeProps) {
  return (
    <ButtonEdge {...props}>
      <EdgeButton />
    </ButtonEdge>
  );
}
