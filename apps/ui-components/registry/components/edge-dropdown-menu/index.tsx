import React, { useEffect, useRef, useState } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
} from "@xyflow/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function EdgeDropdownMenu({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const toggleToolbarVisibility = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    setIsToolbarVisible((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsToolbarVisible(false);
    }
  };

  useEffect(() => {
    if (isToolbarVisible) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isToolbarVisible]);

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{ ...style, pointerEvents: "auto" }}
      />

      <EdgeLabelRenderer>
        <div
          className="nodrag nopan pointer-events-auto absolute"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
          }}
        >
          <Button
            onClick={toggleToolbarVisibility}
            size="icon"
            variant="secondary"
          >
            +
          </Button>
        </div>

        {isToolbarVisible && (
          <div
            ref={menuRef}
            style={{
              position: "absolute",
              top: `${labelY}px`,
              left: `${labelX}px`,
              zIndex: 1000,
              transform: "translate(-50%, -50%)",
              pointerEvents: "auto",
            }}
          >
            <DropdownMenu open>
              <DropdownMenuTrigger />
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => window.alert("New Node Created")}
                >
                  Create New Node
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => window.alert("Node Deleted")}>
                  Delete Node
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </EdgeLabelRenderer>
    </>
  );
}

EdgeDropdownMenu.displayName = "EdgeDropdownMenu";
