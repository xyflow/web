<script module>
  import type { Node } from '@xyflow/svelte';

  export type BoxNodeType = Node<{ color: string }, 'box'>;
</script>

<script lang="ts">
  import {
    NodeResizer,
    NodeToolbar,
    type NodeProps,
    useSvelteFlow,
    useOnSelectionChange,
  } from '@xyflow/svelte';

  let { id, selected, dragging, data }: NodeProps<BoxNodeType> = $props();

  const { updateNodeData } = useSvelteFlow();

  let multipleNodesSelected = $state(false);

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

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      multipleNodesSelected = nodes.length > 1;
    },
  });

  function handleColorChange(newColor: string) {
    updateNodeData(id, { color: newColor });
  }
</script>

<NodeResizer isVisible={selected && !dragging} />
<NodeToolbar isVisible={selected && !dragging && !multipleNodesSelected} class="nopan">
  <div class="toolbar">
    {#each colorOptions as colorOption}
      <button
        onclick={() => handleColorChange(colorOption)}
        class="color-button"
        style="background-color: {colorOption}"
        title="Set color to {colorOption}"
      ></button>
    {/each}
  </div>
</NodeToolbar>

<div class="outer-container">
  <div
    class="inner-container"
    class:selected
    style="background-color: {data.color}"
  ></div>
</div>

<style>
  .toolbar {
    display: flex;
    gap: 0.25rem;
    border-radius: 0.5rem;
    border: 1px solid #e5e5e5;
    background-color: white;
    padding: 0.5rem;
    box-shadow:
      0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
  }

  .color-button {
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 9999px;
    border: none;
    cursor: pointer;
    transition: transform 0.15s ease-in-out;
  }

  .color-button:hover {
    transform: scale(1.1);
  }

  .outer-container {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
  }

  .inner-container {
    position: relative;
    height: calc(100% - 5px);
    width: calc(100% - 5px);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    border: 1px solid #e5e5e5;
  }

  .inner-container.selected {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
</style>
