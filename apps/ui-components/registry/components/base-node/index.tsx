import { useNodeId, useReactFlow } from "@xyflow/react";
import { EllipsisVertical, Trash } from "lucide-react";
import { forwardRef, HTMLAttributes, ReactNode, useCallback } from "react";

import { Button, ButtonProps } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

export const BaseNode = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { selected?: boolean }
>(({ className, selected, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative rounded-md border bg-card text-card-foreground",
      className,
      selected ? "border-muted-foreground shadow-lg" : "",
      "hover:ring-1",
    )}
    tabIndex={0}
    {...props}
  />
));

BaseNode.displayName = "BaseNode";

/**
 * A container for a consistent header layout intended to be used inside the
 * `<BaseNode />` component.
 */
export function BaseNodeHeader({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      {...props}
      className={cn(
        "mx-0 my-0 -mb-1 flex flex-row items-center justify-between gap-2 px-3 py-2",
        // Remove or modify these classes if you modify the padding in the
        // `<BaseNode />` component.
        className,
      )}
    />
  );
}

export function BaseNodeContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="base-node-content"
      className={cn("flex flex-col p-3", className)}
      {...props}
    />
  );
}

export function BaseNodeFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="base-node-footer"
      className={cn(
        "flex flex-col items-center gap-y-2 border-t px-3 pb-3 pt-2",
        className,
      )}
      {...props}
    />
  );
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

/* NODE HEADER -------------------------------------------------------------- */

/* NODE HEADER TITLE -------------------------------------------------------- */

export type NodeHeaderTitleProps = HTMLAttributes<HTMLHeadingElement> & {
  asChild?: boolean;
};

/**
 * The title text for the node. To maintain a native application feel, the title
 * text is not selectable.
 */
export const BaseNodeHeaderTitle = forwardRef<
  HTMLHeadingElement,
  NodeHeaderTitleProps
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "h3";

  return (
    <Comp
      ref={ref}
      {...props}
      className={cn(className, "user-select-none flex-1 font-semibold")}
    />
  );
});

BaseNodeHeaderTitle.displayName = "NodeHeaderTitle";

/* NODE HEADER ACTIONS ------------------------------------------------------ */

export type NodeHeaderActionsProps = HTMLAttributes<HTMLDivElement>;

/**
 * A container for right-aligned action buttons in the node header.
 */
export const NodeHeaderActions = forwardRef<
  HTMLDivElement,
  NodeHeaderActionsProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={cn(
        "ml-auto flex items-center gap-1 justify-self-end",
        className,
      )}
    />
  );
});

NodeHeaderActions.displayName = "NodeHeaderActions";

/* NODE HEADER ACTION ------------------------------------------------------- */

export type NodeHeaderActionProps = ButtonProps & {
  label: string;
};

/**
 * A thin wrapper around the `<Button />` component with a fixed sized suitable
 * for icons.
 *
 * Because the `<NodeHeaderAction />` component is intended to render icons, it's
 * important to provide a meaningful and accessible `label` prop that describes
 * the action.
 */
export const NodeHeaderAction = forwardRef<
  HTMLButtonElement,
  NodeHeaderActionProps
>(({ className, label, title, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant="ghost"
      aria-label={label}
      title={title ?? label}
      className={cn(className, "nodrag size-6 p-1")}
      {...props}
    />
  );
});

NodeHeaderAction.displayName = "NodeHeaderAction";

//

export type NodeHeaderMenuActionProps = Omit<
  NodeHeaderActionProps,
  "onClick"
> & {
  trigger?: ReactNode;
};

/**
 * Renders a header action that opens a dropdown menu when clicked. The dropdown
 * trigger is a button with an ellipsis icon. The trigger's content can be changed
 * by using the `trigger` prop.
 *
 * Any children passed to the `<NodeHeaderMenuAction />` component will be rendered
 * inside the dropdown menu. You can read the docs for the shadcn dropdown menu
 * here: https://ui.shadcn.com/docs/components/dropdown-menu
 *
 */
export const NodeHeaderMenuAction = forwardRef<
  HTMLButtonElement,
  NodeHeaderMenuActionProps
>(({ trigger, children, ...props }, ref) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <NodeHeaderAction ref={ref} {...props}>
          {trigger ?? <EllipsisVertical />}
        </NodeHeaderAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent>{children}</DropdownMenuContent>
    </DropdownMenu>
  );
});

NodeHeaderMenuAction.displayName = "NodeHeaderMenuAction";

/* NODE HEADER DELETE ACTION --------------------------------------- */

export const NodeHeaderDeleteAction = () => {
  const id = useNodeId();
  const { setNodes } = useReactFlow();

  const handleClick = useCallback(() => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
  }, [id, setNodes]);

  return (
    <NodeHeaderAction onClick={handleClick} variant="ghost" label="Delete node">
      <Trash />
    </NodeHeaderAction>
  );
};

NodeHeaderDeleteAction.displayName = "NodeHeaderDeleteAction";
