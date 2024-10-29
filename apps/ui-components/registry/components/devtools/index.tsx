import {
  useEffect, 
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
  type HTMLAttributes,
} from 'react';

import { 
  useNodes, 
  Panel, 
  useStore,
  useStoreApi,
  type OnNodesChange,
  type NodeChange,
} from '@xyflow/react';

import { Button } from "@/components/ui/button";

function ViewportLogger() {
  const viewport = useStore(
    (s) =>
      `x: ${s.transform[0].toFixed(2)}, y: ${s.transform[1].toFixed(
        2,
      )}, zoom: ${s.transform[2].toFixed(2)}`,
  );

  return <Panel position="bottom-left">{viewport}</Panel>;
}


type ChangeLoggerProps = {
  color?: string;
  limit?: number;
};

type ChangeInfoProps = {
  change: NodeChange;
};

function ChangeInfo({ change }: ChangeInfoProps) {
  const id = 'id' in change ? change.id : '-';
  const { type } = change;
  return (
    <div className="mb-3">
      <div>node id: {id}</div>
      <div>
        {type === 'add' ? JSON.stringify(change.item, null, 2) : null}
        {type === 'dimensions'
          ? `dimensions: ${change.dimensions?.width} × ${change.dimensions?.height}`
          : null}
        {type === 'position'
          ? `position: ${change.position?.x.toFixed(
              1,
            )}, ${change.position?.y.toFixed(1)}`
          : null}
        {type === 'remove' ? 'remove' : null}
        {type === 'select' ? (change.selected ? 'select' : 'unselect') : null}
      </div>
    </div>
  );
}

function ChangeLogger({ limit = 20 }: ChangeLoggerProps) {
  const [changes, setChanges] = useState<NodeChange[]>([]);
  const store = useStoreApi();

  useEffect(() => {
    const onNodesChangeLogger: OnNodesChange = (newChanges) => {
      setChanges((oldChanges) => [...newChanges, ...oldChanges].slice(0, limit));
    };

    store.setState({ onNodesChange: onNodesChangeLogger });

    return () => store.setState({ onNodesChange: undefined });
  }, [limit, store]);

  return (
    <Panel className="text-xs p-5 bg-white rounded shadow-md overflow-y-auto max-h-[50%] mt-20" position="bottom-right">
      {changes.length === 0 ? (
        <>No Changes Triggered</>
      ) : (
        changes.map((change, index) => (
          <ChangeInfo key={index} change={change} />
        ))
      )}
    </Panel>
  );
}


function NodeInspector() {
  const nodes = useNodes();

  return (
    <Panel className="text-xs p-4 bg-white rounded shadow-md max-h-[50%] overflow-y-auto mt-20" position="top-left">
        {nodes.map((node) => {
          const x = node.position.x || 0;
          const y = node.position.y || 0;
          const width = node.measured?.width || 0;
          const height = node.measured?.height || 0;

          return (
            <div key={node.id} className="border-b border-gray-300 pb-3 pt-3">
              <div>id: {node.id}</div>
              <div>type: {node.type}</div>
              <div>selected: {node.selected ? 'true' : 'false'}</div>
              <div>
                position: {x.toFixed(1)}, {y.toFixed(1)}
              </div>
              <div>
                dimensions: {width} × {height}
              </div>
              <div>data: {JSON.stringify(node.data, null, 2)}</div>
            </div>
          );
        })}
    </Panel>
  );
}


function DevToolButton({
  active,
  setActive,
  children,
  ...rest
}: {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
} & HTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
    onClick={() => setActive((a) => !a)}
    className={`transition-colors ${active ? "bg-gray-200 mr-1" : "mr-1"} hover:bg-gray-200`}
    variant="outline"
      {...rest}
    >
      {children}
    </Button>
  );
}

export function DevTools() {
  const [nodeInspectorActive, setNodeInspectorActive] = useState(false);
  const [changeLoggerActive, setChangeLoggerActive] = useState(false);
  const [viewportLoggerActive, setViewportLoggerActive] = useState(false);

  return (
    <div>
      <Panel>
        <DevToolButton
          setActive={setNodeInspectorActive}
          active={nodeInspectorActive}
          title="Toggle Node Inspector"
        >
          Node Inspector
        </DevToolButton>
        <DevToolButton
          setActive={setChangeLoggerActive}
          active={changeLoggerActive}
          title="Toggle Change Logger"
        >
          Change Logger
        </DevToolButton>
        <DevToolButton
          setActive={setViewportLoggerActive}
          active={viewportLoggerActive}
          title="Toggle Viewport Logger"
        >
          Viewport Logger
        </DevToolButton>
      </Panel>
      {changeLoggerActive && <ChangeLogger />}
      {nodeInspectorActive && <NodeInspector />}
      {viewportLoggerActive && <ViewportLogger />}
    </div>
  );
}

DevTools.displayName = "DevTools";