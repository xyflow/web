import {
  NodeResizer,
  NodeToolbar,
  type Node,
  type NodeProps,
  useReactFlow,
  useOnSelectionChange,
} from '@xyflow/react';
import { useCallback, useState } from 'react';

export type BoxNodeType = Node<{ color: string }, 'box'>;

const colorOptions = [
  '#f5efe9', // very light warm grey
  '#ef4444', // red
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#3b82f6', // blue
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#64748b', // gray
];

const styles = {
  toolbar: {
    display: 'flex',
    gap: '0.25rem',
    borderRadius: '0.5rem',
    border: '1px solid #e5e5e5',
    backgroundColor: 'white',
    padding: '0.5rem',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  },
  colorButton: {
    height: '1.5rem',
    width: '1.5rem',
    borderRadius: '9999px',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.15s ease-in-out',
  },
  colorButtonHover: {
    transform: 'scale(1.1)',
  },
  outerContainer: {
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    position: 'relative' as const,
    height: 'calc(100% - 5px)',
    width: 'calc(100% - 5px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: '0.375rem',
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    border: '1px solid #e5e5e5',
  },
  innerContainerSelected: {
    outline: '2px solid #3b82f6',
    outlineOffset: '2px',
  },
} as const;

export function BoxNode({
  id,
  selected,
  dragging,
  data: { color },
}: NodeProps<BoxNodeType>) {
  const { updateNodeData } = useReactFlow();

  const [multipleNodesSelected, setMultipleNodesSelected] = useState(false);

  const onSelectionChange = useCallback(
    ({ nodes }: { nodes: Node[] }) => {
      if (nodes.length > 1) {
        setMultipleNodesSelected(true);
      } else {
        setMultipleNodesSelected(false);
      }
    },
    [setMultipleNodesSelected],
  );

  useOnSelectionChange({ onChange: onSelectionChange });

  const handleColorChange = (newColor: string) => {
    updateNodeData(id, { color: newColor });
  };

  return (
    <>
      <NodeResizer isVisible={selected && !dragging} />
      <NodeToolbar
        isVisible={selected && !dragging && !multipleNodesSelected}
        className="nopan"
      >
        <div style={styles.toolbar}>
          {colorOptions.map((colorOption) => (
            <button
              key={colorOption}
              onClick={() => handleColorChange(colorOption)}
              style={{
                ...styles.colorButton,
                backgroundColor: colorOption,
              }}
              title={`Set color to ${colorOption}`}
            />
          ))}
        </div>
      </NodeToolbar>
      <div style={styles.outerContainer}>
        <div
          style={{
            ...styles.innerContainer,
            backgroundColor: color,
            ...(selected ? styles.innerContainerSelected : {}),
          }}
        ></div>
      </div>
    </>
  );
}
