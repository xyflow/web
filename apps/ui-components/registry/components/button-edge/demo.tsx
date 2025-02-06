import { EdgeProps } from "@xyflow/react";
import { memo } from "react";

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

const ButtonEdgeDemo = memo((props: EdgeProps) => {
  return (
    <ButtonEdge {...props}>
      <EdgeButton />
    </ButtonEdge>
  );
});

export default ButtonEdgeDemo;
