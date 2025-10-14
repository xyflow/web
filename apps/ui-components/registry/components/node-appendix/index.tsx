import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const appendixVariants = cva(
  "node-appendix absolute flex w-full flex-col items-center rounded-md border bg-card p-1 text-card-foreground",
  {
    variants: {
      position: {
        top: "-translate-y-full -my-1",
        bottom: "top-full my-1",
        left: "-left-full -mx-1",
        right: "left-full mx-1",
      },
    },
    defaultVariants: {
      position: "top",
    },
  },
);

export interface NodeAppendixProps
  extends ComponentProps<"div">,
    VariantProps<typeof appendixVariants> {
  className?: string;
  position?: "top" | "bottom" | "left" | "right";
}

export function NodeAppendix({
  children,
  className,
  position,
  ...props
}: NodeAppendixProps) {
  return (
    <div className={cn(appendixVariants({ position }), className)} {...props}>
      {children}
    </div>
  );
}
