import { forwardRef, useCallback, useState } from "react";

import {
  Panel,
  useReactFlow,
  type PanelProps,
  type Node,
  BuiltInEdge,
} from "@xyflow/react";

import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

export interface SearchBarProps<T extends Node>
  extends Omit<PanelProps, "children"> {
  onSearch: (nodes: T[], searchString: string) => T[];
  onSelectNode: (node: T) => void;
}

export const SearchBar = forwardRef(function SearchBar<T extends Node>(
  { className, onSearch, onSelectNode, ...props }: SearchBarProps<T>,
  ref: React.Ref<HTMLDivElement>,
) {
  // TODO: Find a way to get the node type
  const [searchResults, setSearchResults] = useState<T[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  const { getNodes } = useReactFlow<T, BuiltInEdge>();
  const currentNodes = getNodes();

  const onChange = useCallback(
    (searchString: string) => {
      setSearchString(searchString);
      const results = onSearch(currentNodes, searchString);
      setSearchResults(results);
    },
    [currentNodes, onSearch],
  );

  return (
    <Panel
      className={cn(
        "flex gap-1 rounded-md bg-primary-foreground p-1 text-foreground",
        className,
      )}
      ref={ref}
      {...props}
    >
      <Command className="rounded-lg border shadow-md md:min-w-[450px]">
        <CommandInput
          placeholder="Search nodes..."
          onValueChange={onChange}
          value={searchString}
        />

        <CommandList>
          {searchString.length > 0 && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
          {searchResults.length > 0 && searchString.length > 0 && (
            <CommandGroup heading="Nodes">
              {searchResults.map((node) => (
                <CommandItem key={node.id} onSelect={() => onSelectNode(node)}>
                  <span>{node.data.label as string}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </Panel>
  );
});

SearchBar.displayName = "SearchBar";
