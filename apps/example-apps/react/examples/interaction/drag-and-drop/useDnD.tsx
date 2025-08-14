import { useReactFlow, XYPosition } from '@xyflow/react';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface DnDContextType {
  // The type of the node that is being dragged.
  type: string | null;
  setType: (type: string | null) => void;
  // If a node is being dragged.
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
  // The action to be performed when a node is dropped.
  dropAction: (position: XYPosition) => void;
  setDropAction: (dropAction: (position: XYPosition) => void) => void;
}

const DnDContext = createContext<DnDContextType | null>(null);

// The DnDProvider is used to provide the context for the DnD functionality.
// This allows you to wrap your `ReactFlow` component instance in the `DnDProvider`,
// so you do not need to register any callback in `App.tsx`.
// You can just use the `useDnD` hook in your components that need to start dragging a new node into the flow.
// In our case, it will be the `Sidebar` component.
export const DnDProvider = ({ children }: { children: React.ReactNode }) => {
  const [type, setType] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dropAction, setDropAction] = useState<(position: XYPosition) => void>(() => {});

  return (
    <DnDContext.Provider
      value={{
        type,
        setType,
        isDragging,
        setIsDragging,
        dropAction,
        // This is a workaround to ensure that the drop action is not treated as a lazy function.
        setDropAction: (action) => setDropAction(() => action),
      }}
    >
      {children}
    </DnDContext.Provider>
  );
};

export default DnDContext;

export const useDnD = () => {
  const { screenToFlowPosition } = useReactFlow();

  const context = useContext(DnDContext);
  if (!context) {
    throw new Error('useDnD must be used within a DnDProvider');
  }

  const { type, setType, isDragging, setIsDragging, dropAction, setDropAction } = context;

  // This callback will be returned by the `useDnD` hook, and can be used in your UI,
  // when you want to start dragging a node into the flow.
  // For example, this is used in the `Sidebar` component.
  const onDragStart = useCallback(
    (event: React.PointerEvent<HTMLDivElement>, nodeType: string) => {
      event.preventDefault();
      (event.target as HTMLElement).setPointerCapture(event.pointerId);
      setType(nodeType);
      setIsDragging(true);
    },
    [setType, setIsDragging],
  );

  const onDragEnd = useCallback(
    (event: PointerEvent) => {
      if (!isDragging || !type) {
        setIsDragging(false);
        return;
      }

      (event.target as HTMLElement).releasePointerCapture(event.pointerId);

      // Use elementFromPoint to get the actual element under the pointer
      const elementUnderPointer = document.elementFromPoint(event.clientX, event.clientY);
      const isDroppingOnFlow = elementUnderPointer?.closest('.react-flow');

      event.preventDefault();

      // Only allow dropping on the flow area
      if (isDroppingOnFlow) {
        const flowPosition = screenToFlowPosition({ x: event.clientX, y: event.clientY });
        dropAction(flowPosition);
      }

      setType(null);
      setIsDragging(false);
    },
    [type, setType, screenToFlowPosition, dropAction, setIsDragging],
  );

  // Add global touch event listeners
  useEffect(() => {
    if (!isDragging) return;

    const handlePointerUp = (event: PointerEvent) => {
      onDragEnd(event);
    };

    document.addEventListener('pointerup', handlePointerUp);

    return () => {
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, [onDragEnd, isDragging]);

  return {
    // State. You usually do not need to access these values directly.
    // They are only used to display the `DragGhost` component.
    // Instead, you can use the `startDragging` action to start dragging a node.
    type,
    isDragging,
    setDropAction,

    // Actions. You can use this action to start dragging a node.
    // For example, this is used in the `Sidebar` component.
    onDragStart,
  };
};

// The DragGhost component is used to display a ghost node when dragging a node into the flow.
export const DragGhost = () => {
  const [position, setPosition] = useState<XYPosition>({ x: 0, y: 0 });
  const context = useContext(DnDContext);
  if (!context) {
    throw new Error('DragGhost must be used within a DnDProvider');
  }
  const { type, isDragging } = context;

  // By default, the pointer move event sets the position of the dragged element in the context.
  // This will be used to display the `DragGhost` component.
  const onDrag = useCallback(
    (event: PointerEvent) => {
      event.preventDefault();
      setPosition({ x: event.clientX, y: event.clientY });
    },
    [isDragging],
  );

  useEffect(() => {
    if (!isDragging) return;
    document.addEventListener('pointermove', onDrag);
    return () => {
      document.removeEventListener('pointermove', onDrag);
    };
  }, [onDrag, isDragging]);

  if (!isDragging || !type) return null;
  return (
    <div
      className={`dndnode ghostnode ${type}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
      }}
    >
      {type && `${type.charAt(0).toUpperCase() + type.slice(1)} Node`}
    </div>
  );
};
