import { NodeToolbar, useStore } from 'reactflow';

const selectedNodesSelector = (state) =>
  Array.from(state.nodeInternals.values())
    .filter((node) => node.selected)
    .map((node) => node.id);

export default function MultiSelectionToolbar() {
  const selectedNodeIds = useStore(selectedNodesSelector);
  const isVisible = selectedNodeIds.length > 1;

  return (
    <NodeToolbar nodeId={selectedNodeIds} isVisible={isVisible}>
      <button>multi selection toolbar</button>
    </NodeToolbar>
  );
}
