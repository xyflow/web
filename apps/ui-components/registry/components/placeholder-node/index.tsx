import React from "react";
import { useReactFlow, Handle, Position, NodeProps, Node } from "@xyflow/react";
import { BaseNode } from "@/registry/components/base-node"; 

type PlaceholderNodeData = Node<{
  label: string;
}>;

export function PlaceholderNode({ data, id, selected }: NodeProps<PlaceholderNodeData>) {
  
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
      id={id}
      selected={selected}
      className="bg-card text-center w-40 border-dashed border-gray-400 text-gray-400 shadow-none"
      onClick={handleClick}
    >
      {data.label}
      <Handle
        type="target"
        style={{ visibility: 'visible' }} 
        position={Position.Top}
        isConnectable={false} 
      />
      <Handle
        type="source"
        style={{ visibility: 'visible' }} 
        position={Position.Bottom}
        isConnectable={false}
      />
    </BaseNode>
  );
}

// Setting the display name for easier debugging
PlaceholderNode.displayName = "PlaceholderNode";
