import { cn } from "@/lib/utils";
import { createContext, forwardRef, HTMLAttributes, useContext } from "react";

interface NodeAppendixProps extends HTMLAttributes<HTMLDivElement> {
  visible?: boolean;
}

const AppendixContext = createContext<boolean | undefined>(undefined);

export const NodeAppendix = forwardRef<HTMLDivElement, NodeAppendixProps>(
  ({ children, visible }, ref) => {
    return (
      <AppendixContext.Provider value={visible}>
        <div ref={ref} className="node-appendix relative">
          {children}
        </div>
      </AppendixContext.Provider>
    );
  },
);

export const NodeAppendixContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const isVisible = useContext(AppendixContext);
  if (isVisible === undefined) {
    throw new Error("NodeAppendixContent must be used within NodeAppendix");
  }

  // Always render a div, but visually hide it when not visible
  return (
    isVisible && (
      <div
        ref={ref}
        className={cn(
          "node-appendix-content absolute top-[100%] my-1 flex w-full flex-col items-center rounded-md border bg-card p-1 text-card-foreground",
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
