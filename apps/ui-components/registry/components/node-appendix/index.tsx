import { cn } from "@/lib/utils";
import { createContext, forwardRef, HTMLAttributes, useContext } from "react";
import { cva, type VariantProps } from "class-variance-authority";

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

NodeAppendix.displayName = "NodeAppendix";

const appendixVariants = cva(
  "node-appendix-content absolute flex w-full flex-col items-center rounded-md border bg-card p-1 text-card-foreground",
  {
    variants: {
      position: {
        top: "-translate-y-[100%] -my-1",
        bottom: "top-[100%] my-1",
        left: "-left-[100%] -mx-1",
        right: "left-[100%] mx-1",
      },
    },
    defaultVariants: {
      position: "top",
    },
  },
);

export interface NodeAppendixContentProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof appendixVariants> {
  className?: string;
  position?: "top" | "bottom" | "left" | "right";
}

export const NodeAppendixContent = forwardRef<
  HTMLDivElement,
  NodeAppendixContentProps
>(({ children, className, position, ...props }, ref) => {
  const isVisible = useContext(AppendixContext);
  if (isVisible === undefined) {
    throw new Error("NodeAppendixContent must be used within NodeAppendix");
  }

  return isVisible ? (
    <div
      ref={ref}
      className={cn(appendixVariants({ position }), className)}
      aria-hidden={!isVisible}
      {...props}
    >
      {children}
    </div>
  ) : null;
});

NodeAppendixContent.displayName = "NodeAppendixContent";
