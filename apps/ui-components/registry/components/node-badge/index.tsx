import { cn } from "@/lib/utils";
import { Position } from "@xyflow/react";
import { createContext, forwardRef, HTMLAttributes, useContext } from "react";

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

// TODO: Maybe add variants for nice pre-defined styling?

export const NodeBadgeContent = forwardRef<
  HTMLDivElement,
  NodeBadgeContentProps
>(({ children, position = Position.Top, ...props }, ref) => {
  const isVisible = useContext(BadgeContext);
  if (isVisible === undefined) {
    throw new Error("NodeBadgeContent must be used within NodeBadge");
  }

  // Always render a div, but visually hide it when not visible
  return (
    <div
      ref={ref}
      className={cn(
        "node-badge-content relative flex flex-col items-end py-1",
        !isVisible && "invisible",
      )}
      aria-hidden={!isVisible}
      {...props}
    >
      {children}
    </div>
  );
});
