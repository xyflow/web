import { NodeToolbar, useStore } from '@xyflow/react';

const selectedNodesSelector = (state) =>
  Array.from(state.nodeLookup.values())
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
