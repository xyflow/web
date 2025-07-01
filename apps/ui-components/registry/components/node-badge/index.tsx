import { NodeToolbar, Position } from "@xyflow/react";
import {
  createContext,
  forwardRef,
  HTMLAttributes,
  useContext,
  useState,
} from "react";

interface NodeBadgeProps extends HTMLAttributes<HTMLDivElement> {
  visible?: boolean;
}

const BadgeContext = createContext<boolean | undefined>(true);

export const NodeBadge = forwardRef<HTMLDivElement, NodeBadgeProps>(
  ({ children, visible }, ref) => {
    return (
      <BadgeContext.Provider value={visible}>
        <div ref={ref} className="node-badge relative">
          {children}
        </div>
      </BadgeContext.Provider>
    );
  },
);

export interface NodeBadgeContentProps extends HTMLAttributes<HTMLDivElement> {
  position?: Position;
}

export const NodeBadgeContent = forwardRef<
  HTMLDivElement,
  NodeBadgeContentProps
>(({ children, position = Position.Top, ...props }, ref) => {
  const isVisible = useContext(BadgeContext);
  if (isVisible === undefined) {
    throw new Error("NodeBadgeContent must be used within NodeBadge");
  }

  return isVisible ? (
    <div
      ref={ref}
      className="node-badge-content relative flex flex-col items-end py-1"
      {...props}
    >
      {children}
    </div>
  ) : null;
});
