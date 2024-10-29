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
  type XYPosition,
  ViewportPortal,
  useReactFlow
} from '@xyflow/react';

import { Button } from "@/components/ui/button";

export function ViewportLogger() {
  const viewport = useStore(
    (s) =>
      `x: ${s.transform[0].toFixed(2)}, y: ${s.transform[1].toFixed(2)}, zoom: ${s.transform[2].toFixed(2)}`,
  );

  return <Panel position="bottom-left" className='text-secondary-foreground'>{viewport}</Panel>;
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
          ? `position: ${change.position?.x.toFixed(1)}, ${change.position?.y.toFixed(1)}`
          : null}
        {type === 'remove' ? 'remove' : null}
        {type === 'select' ? (change.selected ? 'select' : 'unselect') : null}
      </div>
    </div>
  );
}

export function ChangeLogger({ limit = 20 }: ChangeLoggerProps) {
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

export function NodeInspector() {
  const { getInternalNode } = useReactFlow();
  const nodes = useNodes();

  return (
    <ViewportPortal>
      <div className='text-xs text-secondary-foreground'>
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
              type={node.type || 'default'}
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
}

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

function NodeInfo({
  id,
  type,
  selected,
  position,
  absPosition,
  width,
  height,
  data,
}: NodeInfoProps) {
  if (!width || !height) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        transform: `translate(${absPosition.x}px, ${absPosition.y + height}px)`,
        width: width * 2,
      }}
    >
      <div>id: {id}</div>
      <div>type: {type}</div>
      <div>selected: {selected ? 'true' : 'false'}</div>
      <div>
        position: {position.x.toFixed(1)}, {position.y.toFixed(1)}
      </div>
      <div>
        dimensions: {width} × {height}
      </div>
      <div>data: {JSON.stringify(data, null, 2)}</div>
    </div>
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
      className={`
        transition-colors duration-300
        ${active ? 'bg-white text-gray-900' : 'bg-transparent hover:bg-white hover:text-gray-900'}
        ${active ? 'hover:bg-white hover:text-gray-900' : ''}
      `}
      variant="ghost"
      {...rest}
    >
      {children}
    </Button>
  );
}


interface DevToolsProps { 
  ViewportLogger?: () => JSX.Element;
  ChangeLogger?: (props: ChangeLoggerProps) => JSX.Element;
  NodeInspector?: () => JSX.Element;
}
export function DevTools({ ViewportLogger, ChangeLogger, NodeInspector }: DevToolsProps) {
  const [nodeInspectorActive, setNodeInspectorActive] = useState(false);
  const [changeLoggerActive, setChangeLoggerActive] = useState(false);
  const [viewportLoggerActive, setViewportLoggerActive] = useState(false);

  const hasActiveToolProps = ViewportLogger || ChangeLogger || NodeInspector;

  return (
    <div>
      {hasActiveToolProps && (
        <Panel className="flex bg-secondary text-foreground rounded-lg border shadow-sm p-1">
          {NodeInspector && (
            <DevToolButton
              setActive={setNodeInspectorActive}
              active={nodeInspectorActive}
              title="Toggle Node Inspector"
            >
              Node Inspector
            </DevToolButton>
          )}
          {ChangeLogger && (
            <div className="mx-1">
              <DevToolButton
                setActive={setChangeLoggerActive}
                active={changeLoggerActive}
                title="Toggle Change Logger"
              >
                Change Logger
              </DevToolButton>
            </div>
          )}
          {ViewportLogger && (
            <DevToolButton
              setActive={setViewportLoggerActive}
              active={viewportLoggerActive}
              title="Toggle Viewport Logger"
            >
              Viewport Logger
            </DevToolButton>
          )}
        </Panel>
      )}
      {changeLoggerActive && ChangeLogger && <ChangeLogger />}
      {nodeInspectorActive && NodeInspector && <NodeInspector />}
      {viewportLoggerActive && ViewportLogger && <ViewportLogger />}
    </div>
  );
}

DevTools.displayName = "DevTools";