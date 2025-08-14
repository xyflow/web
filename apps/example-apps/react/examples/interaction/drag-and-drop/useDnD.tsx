import { useReactFlow } from '@xyflow/react';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface DnDContextType {
  // The type of the node that is being dragged.
  type: string | null;
  setType: (type: string | null) => void;
  // The position of the dragged node.
  dragPosition?: { x: number; y: number };
  setDragPosition: (dragPosition?: { x: number; y: number }) => void;
}

const DnDContext = createContext<DnDContextType>({
  type: null,
  setType: () => {},
  dragPosition: undefined,
  setDragPosition: () => {},
});

// The DnDProvider is used to provide the context for the DnD functionality.
// This allows you to wrap your `ReactFlow` component instance in the `DnDProvider`,
// so you do not need to register any callback in `App.tsx`.
// You can just use the `useDnD` hook in your components that need to start dragging a new node into the flow.
// In our case, it will be the `Sidebar` component.
export const DnDProvider = ({ children }: { children: React.ReactNode }) => {
  const [type, setType] = useState<string | null>(null);
  const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | undefined>(
    undefined,
  );

  return (
    <DnDContext.Provider value={{ type, setType, dragPosition, setDragPosition }}>
      {children}
    </DnDContext.Provider>
  );
};

export default DnDContext;

// This is a simple ID generator for the nodes.
// You can customize this to use your own ID generation logic.
let id = 0;
const getId = () => `dndnode_${id++}`;

export const useDnD = () => {
  const { screenToFlowPosition, setNodes } = useReactFlow();

  const { type, setType, dragPosition, setDragPosition } = useContext(DnDContext);

  // This callback will be returned by the `useDnD` hook, and can be used in your UI,
  // when you want to start dragging a node into the flow.
  // For example, this is used in the `Sidebar` component.
  const onDragStart = useCallback(
    (event: React.PointerEvent<HTMLDivElement>, nodeType: string) => {
      event.preventDefault();
      (event.target as HTMLElement).setPointerCapture(event.pointerId);
      setType(nodeType);
      setDragPosition({ x: event.clientX, y: event.clientY });
    },
    [setType, setDragPosition],
  );

  // By default, the pointer move event sets the position of the dragged element in the context.
  // This will be used to display the `DragGhost` component.
  const onDrag = useCallback(
    (event: PointerEvent) => {
      if (!dragPosition) return;
      event.preventDefault();
      setDragPosition({ x: event.clientX, y: event.clientY });
    },
    [dragPosition, setDragPosition],
  );

  const onDragEnd = useCallback(
    (event: PointerEvent) => {
      if (!dragPosition || !type) {
        setDragPosition(undefined);
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

        // Here, we create a new node and add it to the flow.
        // You can customize the behavior here.
        const newNode = {
          id: getId(),
          type,
          position: flowPosition,
          data: { label: `${type} node` },
        };

        setNodes((nds) => nds.concat(newNode));
      }

      setDragPosition(undefined);
      setType(null);
    },
    [dragPosition, type, setDragPosition, setType, screenToFlowPosition, setNodes],
  );

  // Add global touch event listeners
  useEffect(() => {
    if (dragPosition) {
      document.addEventListener('pointermove', onDrag);
      document.addEventListener('pointerup', onDragEnd);

      return () => {
        document.removeEventListener('pointermove', onDrag);
        document.removeEventListener('pointerup', onDragEnd);
      };
    }
  }, [dragPosition, onDrag, onDragEnd]);

  return {
    // State. You usually do not need to access these values directly.
    // They are only used to display the `DragGhost` component.
    // Instead, you can use the `startDragging` action to start dragging a node.
    type,
    dragPosition,

    // Actions. You can use this action to start dragging a node.
    // For example, this is used in the `Sidebar` component.
    onDragStart,
  };
};

// The DragGhost component is used to display a ghost node when dragging a node into the flow.
export const DragGhost = () => {
  const { type, dragPosition } = useDnD();

  if (!dragPosition) return null;

  return (
    <div
      className={`dndnode ghostnode ${type}`}
      style={{
        transform: `translate(${dragPosition.x}px, ${dragPosition.y}px) translate(-50%, -50%)`,
      }}
    >
      {type && `${type.charAt(0).toUpperCase() + type.slice(1)} Node`}
    </div>
  );
};
