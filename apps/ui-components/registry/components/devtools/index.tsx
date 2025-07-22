import {
  useEffect,
  useState,
  useCallback,
  type Dispatch,
  type SetStateAction,
} from "react";

import {
  useNodes,
  Panel,
  useStore,
  useStoreApi,
  ViewportPortal,
  useReactFlow,
  PanelPosition,
  type OnNodesChange,
  type NodeChange,
  type XYPosition,
} from "@xyflow/react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const ViewportLogger = () => {
  const viewport = useStore(
    (s) =>
      `x: ${s.transform[0].toFixed(2)}, y: ${s.transform[1].toFixed(2)}, zoom: ${s.transform[2].toFixed(2)}`,
  );

  return <div>{viewport}</div>;
};

type ChangeLoggerProps = {
  color?: string;
  limit?: number;
};

type ChangeInfoProps = {
  change: NodeChange;
};

const ChangeInfo = ({ change }: ChangeInfoProps) => {
  const id = "id" in change ? change.id : "-";
  const { type } = change;

  return (
    <div className="mb-3">
      <div>node id: {id}</div>
      <div>
        {type === "add" ? JSON.stringify(change.item, null, 2) : null}
        {type === "dimensions"
          ? `dimensions: ${change.dimensions?.width} × ${change.dimensions?.height}`
          : null}
        {type === "position"
          ? `position: ${change.position?.x.toFixed(1)}, ${change.position?.y.toFixed(1)}`
          : null}
        {type === "remove" ? "remove" : null}
        {type === "select" ? (change.selected ? "select" : "unselect") : null}
      </div>
    </div>
  );
};

export const ChangeLogger = ({ limit = 20 }: ChangeLoggerProps) => {
  const [changes, setChanges] = useState<NodeChange[]>([]);
  const store = useStoreApi();

  // Memoize the callback for handling node changes
  const handleNodeChanges: OnNodesChange = useCallback(
    (newChanges: NodeChange[]) => {
      setChanges((prevChanges) =>
        [...newChanges, ...prevChanges].slice(0, limit),
      );
    },
    [limit],
  );

  useEffect(() => {
    store.setState({ onNodesChange: handleNodeChanges });

    return () => store.setState({ onNodesChange: undefined });
  }, [handleNodeChanges, store]);

  const NoChanges = () => <div>No Changes Triggered</div>;

  return (
    <>
      {changes.length === 0 ? (
        <NoChanges />
      ) : (
        changes.map((change, index) => (
          <ChangeInfo key={index} change={change} />
        ))
      )}
    </>
  );
};

export const NodeInspector = () => {
  const { getInternalNode } = useReactFlow();
  const nodes = useNodes();

  return (
    <ViewportPortal>
      <div className="text-secondary-foreground">
        {nodes.map((node) => {
          const internalNode = getInternalNode(node.id);
          if (!internalNode) {
            return null;
          }

          const absPosition = internalNode?.internals.positionAbsolute;

          return (
            <NodeInfo
              key={node.id}
              id={node.id}
              selected={!!node.selected}
              type={node.type || "default"}
              position={node.position}
              absPosition={absPosition}
              width={node.measured?.width ?? 0}
              height={node.measured?.height ?? 0}
              data={node.data}
            />
          );
        })}
      </div>
    </ViewportPortal>
  );
};

type NodeInfoProps = {
  id: string;
  type: string;
  selected: boolean;
  position: XYPosition;
  absPosition: XYPosition;
  width?: number;
  height?: number;
  data: any;
};

const NodeInfo = ({
  id,
  type,
  selected,
  position,
  absPosition,
  width,
  height,
  data,
}: NodeInfoProps) => {
  if (!width || !height) return null;

  const absoluteTransform = `translate(${absPosition.x}px, ${absPosition.y + height}px)`;
  const formattedPosition = `${position.x.toFixed(1)}, ${position.y.toFixed(1)}`;
  const formattedDimensions = `${width} × ${height}`;
  const selectionStatus = selected ? "Selected" : "Not Selected";

  return (
    <div
      style={{
        position: "absolute",
        transform: absoluteTransform,
        width: width * 2,
      }}
      className="text-xs"
    >
      <div>id: {id}</div>
      <div>type: {type}</div>
      <div>selected: {selectionStatus}</div>
      <div>position: {formattedPosition}</div>
      <div>dimensions: {formattedDimensions}</div>
      <div>data: {JSON.stringify(data, null, 2)}</div>
    </div>
  );
};

type Tool = {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  label: string;
  value: string;
};

type DevToolsToggleProps = {
  tools: Tool[];
  position: PanelPosition;
};

const DevToolsToggle = ({ tools, position }: DevToolsToggleProps) => {
  return (
    <Panel position={position} className="rounded border bg-card p-1 shadow-sm">
      <ToggleGroup type="multiple">
        {tools.map(({ active, setActive, label, value }) => (
          <ToggleGroupItem
            key={value}
            value={value}
            onClick={() => setActive((prev) => !prev)}
            aria-pressed={active}
            className="bg-card text-card-foreground transition-colors duration-300 hover:bg-secondary hover:text-secondary-foreground"
          >
            {label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </Panel>
  );
};

type DevToolsProps = {
  position: PanelPosition;
};

export const DevTools = ({ position }: DevToolsProps) => {
  const [nodeInspectorActive, setNodeInspectorActive] = useState(false);
  const [changeLoggerActive, setChangeLoggerActive] = useState(false);
  const [viewportLoggerActive, setViewportLoggerActive] = useState(false);

  const tools = [
    {
      active: nodeInspectorActive,
      setActive: setNodeInspectorActive,
      label: "Node Inspector",
      value: "node-inspector",
    },
    {
      active: changeLoggerActive,
      setActive: setChangeLoggerActive,
      label: "Change Logger",
      value: "change-logger",
    },
    {
      active: viewportLoggerActive,
      setActive: setViewportLoggerActive,
      label: "Viewport Logger",
      value: "viewport-logger",
    },
  ];

  return (
    <>
      <DevToolsToggle tools={tools} position={position} />

      {changeLoggerActive && (
        <Panel
          className="mt-20 max-h-[50%] overflow-y-auto rounded bg-white p-5 text-xs shadow-md"
          position="bottom-right"
        >
          <ChangeLogger />
        </Panel>
      )}

      {nodeInspectorActive && <NodeInspector />}

      {viewportLoggerActive && (
        <Panel position="bottom-left" className="text-secondary-foreground">
          <ViewportLogger />
        </Panel>
      )}
    </>
  );
};

DevTools.displayName = "DevTools";
