import { forwardRef, useCallback, useState } from "react";

import {
  BuiltInEdge,
  Panel,
  useReactFlow,
  type Node,
  type PanelProps,
} from "@xyflow/react";

import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export interface SearchBarProps<T extends Node>
  extends Omit<PanelProps, "children"> {
  // The function to search for nodes, should return an array of nodes that match the search string
  // By default, it will check for lowercase string inclusion.
  onSearch?: (nodes: T[], searchString: string) => T[];
  // The function to select a node, should set the node as selected and fit the view to the node
  // By default, it will set the node as selected and fit the view to the node.
  onSelectNode?: (node: T) => void;
}

export const SearchBar = forwardRef(function SearchBar<T extends Node>(
  { className, onSearch, onSelectNode, ...props }: SearchBarProps<T>,
  ref: React.Ref<HTMLDivElement>,
) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<T[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  const { getNodes } = useReactFlow<T, BuiltInEdge>();

  const defaultOnSearch = useCallback((nodes: T[], searchString: string) => {
    return nodes.filter((node) =>
      (node.data.label as string)
        .toLowerCase()
        .includes(searchString.toLowerCase()),
    );
  }, []);

  onSearch = onSearch || defaultOnSearch;

  const onChange = useCallback(
    (searchString: string) => {
      setIsOpen(true);
      setSearchString(searchString);
      const currentNodes = getNodes();
      const results = onSearch(currentNodes, searchString);
      setSearchResults(results);
    },
    [getNodes, onSearch],
  );

  const { fitView, setNodes } = useReactFlow<T, BuiltInEdge>();
  const defaultOnSelectNode = useCallback(
    (node: T) => {
      setNodes((nodes) =>
        nodes.map((n) => (n.id === node.id ? { ...n, selected: true } : n)),
      );
      fitView({ nodes: [node], duration: 500 });
    },
    [fitView, setNodes],
  );

  onSelectNode = onSelectNode || defaultOnSelectNode;

  const onSelect = useCallback(
    (node: T) => {
      onSelectNode(node);
      setSearchString("");
      setIsOpen(false);
    },
    [onSelectNode],
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
      <Command
        shouldFilter={false}
        className="rounded-lg border shadow-md md:min-w-[450px]"
      >
        <CommandInput
          placeholder="Search nodes..."
          onValueChange={onChange}
          value={searchString}
          onFocus={() => setIsOpen(true)}
        />

        {isOpen && (
          <CommandList>
            {searchString.length > 0 && searchResults.length === 0 && (
              <CommandEmpty>No results found. {searchString}</CommandEmpty>
            )}
            {searchResults.length > 0 && searchString.length > 0 && (
              <CommandGroup heading="Nodes">
                {searchResults.map((node) => {
                  return (
                    <CommandItem key={node.id} onSelect={() => onSelect(node)}>
                      <span>{node.data.label as string}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}
          </CommandList>
        )}
      </Command>
    </Panel>
  );
});

SearchBar.displayName = "SearchBar";
