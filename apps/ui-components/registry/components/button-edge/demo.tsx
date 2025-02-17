import { EdgeProps } from "@xyflow/react";
import { memo } from "react";

import { Button } from "@/components/ui/button";
import { MousePointerClick } from "lucide-react";
import { ButtonEdge } from "@/registry/components/button-edge";

const ButtonEdgeDemo = memo((props: EdgeProps) => {
  const onEdgeClick = () => {
    window.alert(`Edge has been clicked!`);
  };
  return (
    <ButtonEdge {...props}>
      <Button onClick={onEdgeClick} size="icon" variant="secondary">
        <MousePointerClick size={16} />
      </Button>
    </ButtonEdge>
  );
});

export default ButtonEdgeDemo;
