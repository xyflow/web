import { cn } from "@/lib/utils";
import { createContext, forwardRef, HTMLAttributes, useContext } from "react";

interface NodeBadgeProps extends HTMLAttributes<HTMLDivElement> {
  visible?: boolean;
}

const BadgeContext = createContext<boolean | undefined>(undefined);

export const NodeAppendix = forwardRef<HTMLDivElement, NodeBadgeProps>(
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

export const NodeAppendixContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const isVisible = useContext(BadgeContext);
  if (isVisible === undefined) {
    throw new Error("NodeAppendixContent must be used within NodeAppendix");
  }

  // Always render a div, but visually hide it when not visible
  return (
    isVisible && (
      <div
        ref={ref}
        className={cn(
          "node-badge-content absolute top-[100%] my-1 flex w-full flex-col items-center rounded-md border bg-card p-1 text-card-foreground",
          className,
        )}
        aria-hidden={!isVisible}
        {...props}
      >
        {children}
      </div>
    )
  );
});
