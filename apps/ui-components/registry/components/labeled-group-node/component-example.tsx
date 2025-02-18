import { memo } from "react";

import { NodeProps } from "@xyflow/react";
import { GroupNode } from "@/registry/components/labeled-group-node";

const LabeledGroupNodeDemo = memo(({ selected }: NodeProps) => {
  return <GroupNode selected={selected} label="Label" />;
});

export default LabeledGroupNodeDemo;
