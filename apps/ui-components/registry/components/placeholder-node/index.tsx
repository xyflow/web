import React from "react";
import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";
import { BaseNode } from "@/registry/components/base-node"; 


export const PlaceholderNode = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { selected?: boolean; id: string }
>(({ className, selected, id, ...props }, ref) => {
  
  const { setNodes, setEdges } = useReactFlow();

  const handleClick = () => {
    setEdges((edges) =>
      edges.map((edge) =>
        edge.target === id ? { ...edge, animated: false } : edge
      )
    );
    setNodes((nodes) => {
      const updatedNodes = nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: { ...node.data, label: "New Node" },
            type: "default",
          };
        }
        return node;
      });
      return updatedNodes;
    });
  };

  return (
    <BaseNode
      ref={ref}
      onClick={handleClick}
      className={cn(
        "bg-card text-center w-40 border-dashed border-gray-400 text-gray-400 shadow-none",
        className,
      )}
      {...props}
    />
  );
});

PlaceholderNode.displayName = "PlaceholderNode";
