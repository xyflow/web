import { memo } from "react";

import { GroupNode } from "@/registry/components/labeled-group-node";

const LabeledGroupNodeDemo = memo(() => <GroupNode label="Label" />);

LabeledGroupNodeDemo.displayName = "LabeledGroupNodeDemo";

export default LabeledGroupNodeDemo;
