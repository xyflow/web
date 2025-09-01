import { useDraggable } from '@neodrag/react';
import { useReactFlow, XYPosition } from '@xyflow/react';
import { useCallback, useRef, useState } from 'react';
import { cn } from '../../../tutorials/components/tooltip/lib/utils';

// This is a simple ID generator for the nodes.
// You can customize this to use your own ID generation logic.
let id = 0;
const getId = () => `dndnode_${id++}`;

interface DraggableNodeProps {
  className?: string;
  children: React.ReactNode;
  nodeType: string;
  onDrop: (nodeType: string, position: XYPosition) => void;
}

function DraggableNode({ className, children, nodeType, onDrop }: DraggableNodeProps) {
  const draggableRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<XYPosition>({ x: 0, y: 0 });

  useDraggable(draggableRef, {
    position: position,
    onDrag: ({ offsetX, offsetY }) => {
      // Calculate position relative to the viewport
      setPosition({
        x: offsetX,
        y: offsetY,
      });
    },
    onDragEnd: ({ event }) => {
      setPosition({ x: 0, y: 0 });
      onDrop(nodeType, {
        x: event.clientX,
        y: event.clientY,
      });
    },
  });

  return (
    <div className={cn('dndnode', className)} ref={draggableRef}>
      {children}
    </div>
  );
}

export function Sidebar() {
  const { setNodes, screenToFlowPosition } = useReactFlow();

  const handleNodeDrop = useCallback(
    (nodeType: string, screenPosition: XYPosition) => {
      const flow = document.querySelector('.react-flow');
      const flowRect = flow?.getBoundingClientRect();
      const isInFlow =
        flowRect &&
        screenPosition.x >= flowRect.left &&
        screenPosition.x <= flowRect.right &&
        screenPosition.y >= flowRect.top &&
        screenPosition.y <= flowRect.bottom;

      // Create a new node and add it to the flow
      if (isInFlow) {
        const position = screenToFlowPosition(screenPosition);

        const newNode = {
          id: getId(),
          type: nodeType,
          position,
          data: { label: `${nodeType} node` },
        };

        setNodes((nds) => nds.concat(newNode));
      }
    },
    [setNodes, screenToFlowPosition],
  );

  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane to create new nodes.
      </div>
      <DraggableNode className="input" nodeType="input" onDrop={handleNodeDrop}>
        Input Node
      </DraggableNode>
      <DraggableNode className="default" nodeType="default" onDrop={handleNodeDrop}>
        Default Node
      </DraggableNode>
      <DraggableNode className="output" nodeType="output" onDrop={handleNodeDrop}>
        Output Node
      </DraggableNode>
    </aside>
  );
}
