import { memo } from "react";
import { PlaceholderNode } from "@/registry/components/placeholder-node";

const PlaceholderNodeDemo = memo(() => {
  return (
    <PlaceholderNode>
      <div>+</div>
    </PlaceholderNode>
  );
});

PlaceholderNodeDemo.displayName = "PlaceholderNodeDemo";

export default PlaceholderNodeDemo;
