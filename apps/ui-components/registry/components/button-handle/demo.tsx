import { Position } from "@xyflow/react";
import { MousePointerClick } from "lucide-react";

import { ButtonHandle } from "@/registry/components/button-handle";
import { BaseNode } from "@/registry/components/base-node";

import { Button } from "@/components/ui/button";

const onClick = () => {
  window.alert(`Handle button has been clicked!`);
};

const ButtonHandleDemo = () => {
  return (
    <BaseNode>
      Base Node
      <ButtonHandle id="top" type="target" position={Position.Top}>
        <Button
          onClick={onClick}
          size="icon"
          variant="secondary"
          className="rounded-full"
        >
          <MousePointerClick size={16} />
        </Button>
      </ButtonHandle>
      <ButtonHandle id="right" type="source" position={Position.Right}>
        <Button
          onClick={onClick}
          size="icon"
          variant="secondary"
          className="rounded-full"
        >
          <MousePointerClick size={16} />
        </Button>
      </ButtonHandle>
      <ButtonHandle id="bottom" type="source" position={Position.Bottom}>
        <Button
          onClick={onClick}
          size="icon"
          variant="secondary"
          className="rounded-full"
        >
          <MousePointerClick size={16} />
        </Button>
      </ButtonHandle>
      <ButtonHandle id="left" type="target" position={Position.Left}>
        <Button
          onClick={onClick}
          size="icon"
          variant="secondary"
          className="rounded-full"
        >
          <MousePointerClick size={16} />
        </Button>
      </ButtonHandle>
    </BaseNode>
  );
};

export default ButtonHandleDemo;
