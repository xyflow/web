import {
  Tooltip,
  TooltipContent,
  TooltipContentProps,
  TooltipProps,
  TooltipProvider,
  TooltipTrigger,
  TooltipTriggerProps,
} from '@radix-ui/react-tooltip';
import { ReactNode } from 'react';

export function TooltipSimple({
  children,
  label,
  rootProps,
  triggerProps,
  contentProps,
}: {
  children: ReactNode;
  label: string;
  rootProps?: TooltipProps;
  triggerProps?: TooltipTriggerProps;
  contentProps?: TooltipContentProps;
}) {
  return (
    <TooltipProvider>
      <Tooltip {...rootProps} delayDuration={0}>
        <TooltipTrigger {...triggerProps} asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent
          className="mb-2 px-2 py-1.5 overflow-hidden border border-border shadow-md rounded-md bg-popover text-popover-foreground"
          {...contentProps}
        >
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
