import { useReactFlow } from '@xyflow/react';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface DnDContextType {
  type: string | null;
  setType: (type: string | null) => void;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
  dragPosition: { x: number; y: number };
  setDragPosition: (dragPosition: { x: number; y: number }) => void;
}

const DnDContext = createContext<DnDContextType>({
  type: null,
  setType: () => {},
  isDragging: false,
  setIsDragging: () => {},
  dragPosition: { x: 0, y: 0 },
  setDragPosition: () => {},
});

export const DnDProvider = ({ children }: { children: React.ReactNode }) => {
  const [type, setType] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  return (
    <DnDContext.Provider
      value={{ type, setType, isDragging, setIsDragging, dragPosition, setDragPosition }}
    >
      {children}
    </DnDContext.Provider>
  );
};

export default DnDContext;

let id = 0;
const getId = () => `dndnode_${id++}`;

export const useDnD = () => {
  const { screenToFlowPosition, setNodes } = useReactFlow();

  const { type, setType, isDragging, setIsDragging, dragPosition, setDragPosition } =
    useContext(DnDContext);

  // This callback will be returned by the `useDnD` hook, and can be used in your UI,
  // when you want to start dragging a node into the flow.
  // For example, this is used in the `Sidebar` component.
  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>, nodeType: string) => {
      event.preventDefault();
      (event.target as HTMLElement).setPointerCapture(event.pointerId);
      setType(nodeType);
      setIsDragging(true);
      setDragPosition({ x: event.clientX, y: event.clientY });
    },
    [setType, setIsDragging, setDragPosition],
  );

  const onPointerMove = useCallback(
    (event: PointerEvent) => {
      if (!isDragging) return;
      event.preventDefault();
      setDragPosition({ x: event.clientX, y: event.clientY });
    },
    [isDragging, setDragPosition],
  );

  const onPointerUp = useCallback(
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

        const newNode = {
          id: getId(),
          type,
          position: flowPosition,
          data: { label: `${type} node` },
        };

        setNodes((nds) => nds.concat(newNode));
      }

      setIsDragging(false);
      setType(null);
    },
    [isDragging, type, setIsDragging, setType, screenToFlowPosition, setNodes],
  );

  // Add global touch event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);

      return () => {
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
      };
    }
  }, [isDragging, onPointerMove, onPointerUp]);

  return {
    // State
    type,
    isDragging,
    dragPosition,

    // Actions
    onPointerDown,
  };
};

// The DragGhost component is used to display a ghost node when dragging a node into the flow.
export const DragGhost = () => {
  const { type, isDragging, dragPosition } = useDnD();
  if (!isDragging) return null;
  return (
    <div
      className={`dndnode ${type}`}
      style={{
        position: 'fixed',
        left: dragPosition.x - 25,
        top: dragPosition.y - 25,
        pointerEvents: 'none',
        zIndex: 1000,
        fontSize: '12px',
      }}
    >
      {type && `${type.charAt(0).toUpperCase() + type.slice(1)} Node`}
    </div>
  );
};
