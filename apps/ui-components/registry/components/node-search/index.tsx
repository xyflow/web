import { forwardRef, useCallback, useState } from "react";

import {
  BuiltInEdge,
  useReactFlow,
  type Node,
  type PanelProps,
} from "@xyflow/react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export interface NodeSearchProps extends Omit<PanelProps, "children"> {
  // The function to search for nodes, should return an array of nodes that match the search string
  // By default, it will check for lowercase string inclusion.
  onSearch?: (searchString: string) => Node[];
  // The function to select a node, should set the node as selected and fit the view to the node
  // By default, it will set the node as selected and fit the view to the node.
  onSelectNode?: (node: Node) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const NodeSearchInternal = forwardRef(function NodeSearch(
  {
    className,
    onSearch,
    onSelectNode,
    open,
    onOpenChange,
    ...props
  }: NodeSearchProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const [searchResults, setSearchResults] = useState<Node[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  const { getNodes, fitView, setNodes } = useReactFlow<Node, BuiltInEdge>();

  const defaultOnSearch = useCallback(
    (searchString: string) => {
      const nodes = getNodes();
      return nodes.filter((node) =>
        (node.data.label as string)
          .toLowerCase()
          .includes(searchString.toLowerCase()),
      );
    },
    [getNodes],
  );

  const onChange = useCallback(
    (searchString: string) => {
      setSearchString(searchString);
      if (searchString.length > 0) {
        onOpenChange?.(true);
        const results = (onSearch || defaultOnSearch)(searchString);
        setSearchResults(results);
      }
    },
    [onSearch, onOpenChange],
  );

  const defaultOnSelectNode = useCallback(
    (node: Node) => {
      setNodes((nodes) =>
        nodes.map((n) => (n.id === node.id ? { ...n, selected: true } : n)),
      );
      fitView({ nodes: [node], duration: 500 });
    },
    [fitView, setNodes],
  );

  onSelectNode = onSelectNode || defaultOnSelectNode;

  const onSelect = useCallback(
    (node: Node) => {
      onSelectNode?.(node);
      setSearchString("");
      onOpenChange?.(false);
    },
    [onSelectNode, onOpenChange],
  );

  return (
    <>
      <CommandInput
        placeholder="Search nodes..."
        onValueChange={onChange}
        value={searchString}
        onFocus={() => onOpenChange?.(true)}
      />

      {open && (
        <CommandList>
          {searchResults.length === 0 ? (
            <CommandEmpty>No results found. {searchString}</CommandEmpty>
          ) : (
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
    </>
  );
});

export const NodeSearch = forwardRef(function NodeSearch(
  { className, onSearch, onSelectNode, ...props }: NodeSearchProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const [open, setOpen] = useState(false);
  return (
    <Command
      shouldFilter={false}
      className="rounded-lg border shadow-md md:min-w-[450px]"
    >
      <NodeSearchInternal
        ref={ref}
        className={className}
        onSearch={onSearch}
        onSelectNode={onSelectNode}
        open={open}
        onOpenChange={setOpen}
        {...props}
      />
    </Command>
  );
});

NodeSearch.displayName = "NodeSearch";

export interface NodeSearchDialogProps extends NodeSearchProps {
  title?: string;
}

export const NodeSearchDialog = forwardRef(function NodeSearchDialog(
  {
    className,
    onSearch,
    onSelectNode,
    open,
    onOpenChange,
    title = "Node Search",
    ...props
  }: NodeSearchDialogProps,
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <NodeSearchInternal
        ref={ref}
        className={className}
        onSearch={onSearch}
        onSelectNode={onSelectNode}
        open={open}
        onOpenChange={onOpenChange}
        {...props}
      />
    </CommandDialog>
  );
});

NodeSearchDialog.displayName = "NodeSearchDialog";
