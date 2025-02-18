import { Plus } from "lucide-react";
import {
  ConnectionState,
  Position,
  ReactFlowState,
  useConnection,
} from "@xyflow/react";

import { ButtonHandle } from "@/registry/components/button-handle";
import { BaseNode } from "@/registry/components/base-node";

import { Button } from "@/components/ui/button";

const onClick = () => {
  window.alert(`Handle button has been clicked!`);
};

const selector = (connection: ConnectionState) => {
  return connection.inProgress;
};

const ButtonHandleDemo = () => {
  const connectionInProgress = useConnection(selector);

  return (
    <BaseNode>
      Node with a handle button
      <ButtonHandle
        type="target"
        position={Position.Bottom}
        showButton={!connectionInProgress}
      >
        <Button
          onClick={onClick}
          size="sm"
          variant="secondary"
          className="rounded-full"
        >
          <Plus size={10} />
        </Button>
      </ButtonHandle>
    </BaseNode>
  );
};

export default ButtonHandleDemo;
