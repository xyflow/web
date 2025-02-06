import { Position } from "@xyflow/react";
import { BaseHandle } from "@/registry/components/base-handle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export type SourceHandleProps = {
  className?: string;
  position: Position;
  id?: string;
};

export function SourceHandle({
  className,
  position,
  ...props
}: SourceHandleProps) {
  const positionStyles: Record<
    Position,
    {
      line: string;
      button: string;
      dropdownSide: "top" | "bottom" | "left" | "right";
    }
  > = {
    [Position.Top]: {
      line: "h-10 w-[1px] -translate-y-12",
      button: "-translate-y-16",
      dropdownSide: "top",
    },
    [Position.Bottom]: {
      line: "h-10 w-[1px] translate-y-2",
      button: "translate-y-11",
      dropdownSide: "bottom",
    },
    [Position.Left]: {
      line: "w-10 h-[1px] -translate-x-12 translate-y-[1.5px]",
      button: "absolute top-1/2 -translate-y-1/2 -translate-x-16",
      dropdownSide: "left",
    },
    [Position.Right]: {
      line: "w-10 h-[1px] translate-x-2 translate-y-[1.5px]",
      button: "absolute top-1/2 -translate-y-1/2 translate-x-11",
      dropdownSide: "right",
    },
  };

  const currentPosition = positionStyles[position || Position.Bottom];
  const isVertical = position === Position.Top || position === Position.Bottom;

  return (
    <BaseHandle
      type="source"
      position={position}
      id={props.id}
      className={className}
    >
      <>
        <div
          className={`absolute left-1/2 z-0 -translate-x-1/2 bg-gray-300 ${currentPosition.line}`}
        />
        <div
          className={`nodrag nopan pointer-events-auto absolute left-1/2 -translate-x-1/2 ${currentPosition.button}`}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                onClick={() => console.log("Connection Added")}
                size="icon"
                variant="secondary"
                className="grid h-6 w-6 place-items-center rounded-xl border p-0 hover:bg-card"
              >
                <span className="inline-flex translate-y-[-2px] text-base">
                  +
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align={isVertical ? "center" : "start"}
              side={currentPosition.dropdownSide}
            >
              <DropdownMenuLabel>Create New Node</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Output Node</DropdownMenuItem>
              <DropdownMenuItem>Text Input Node</DropdownMenuItem>
              <DropdownMenuItem>Translate Node</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </>
    </BaseHandle>
  );
}
