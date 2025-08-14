import { useReactFlow, XYPosition } from '@xyflow/react';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export type OnDropAction = ({ position }: { position: XYPosition }) => void;

interface DnDContextType {
  // If a node is being dragged.
  isDragging: boolean;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
  // The action to be performed when something is dropped on the flow.
  dropAction: OnDropAction | null;
  setDropAction: Dispatch<SetStateAction<OnDropAction | null>>;
}

const DnDContext = createContext<DnDContextType | null>(null);

// The DnDProvider is used to provide the context for the DnD functionality.
// This allows you to wrap your `ReactFlow` component instance in the `DnDProvider`,
// so you do not need to register any callback in `App.tsx`.
// You can just use the `useDnD` hook in your components that need to start dragging a new node into the flow.
// In our case, it will be the `Sidebar` component.
export function DnDProvider({ children }: { children: React.ReactNode }) {
  const [isDragging, setIsDragging] = useState(false);
  const [dropAction, setDropAction] = useState<OnDropAction | null>(null);

  return (
    <DnDContext.Provider
      value={{
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
}

export default DnDContext;

export const useDnD = () => {
  const { screenToFlowPosition } = useReactFlow();

  const context = useContext(DnDContext);

  if (!context) {
    throw new Error('useDnD must be used within a DnDProvider');
  }

  const { isDragging, setIsDragging, setDropAction, dropAction } = context;

  // This callback will be returned by the `useDnD` hook, and can be used in your UI,
  // when you want to start dragging a node into the flow.
  // For example, this is used in the `Sidebar` component.
  const onDragStart = useCallback(
    (event: React.PointerEvent<HTMLDivElement>, onDrop: OnDropAction) => {
      event.preventDefault();
      (event.target as HTMLElement).setPointerCapture(event.pointerId);
      setIsDragging(true);
      setDropAction(onDrop);
    },
    [setIsDragging, setDropAction],
  );

  const onDragEnd = useCallback(
    (event: PointerEvent) => {
      if (!isDragging) {
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
        dropAction?.({ position: flowPosition });
      }

      setIsDragging(false);
    },
    [screenToFlowPosition, setIsDragging, dropAction],
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
  }, [onDragEnd, isDragging, dropAction]);

  return {
    isDragging,
    onDragStart,
  };
};

export const useDnDPosition = () => {
  const [position, setPosition] = useState<XYPosition>({ x: 0, y: 0 });

  // By default, the pointer move event sets the position of the dragged element in the context.
  // This will be used to display the `DragGhost` component.
  const onDrag = useCallback((event: PointerEvent) => {
    event.preventDefault();
    setPosition({ x: event.clientX, y: event.clientY });
  }, []);

  useEffect(() => {
    document.addEventListener('pointermove', onDrag);
    return () => {
      document.removeEventListener('pointermove', onDrag);
    };
  }, [onDrag]);

  return { position };
};
