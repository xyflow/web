<script lang="ts">
  import { useSvelteFlow, Handle, Position, type NodeProps } from '@xyflow/svelte';

  let { id, data }: NodeProps = $props();

  let { updateNodeData } = useSvelteFlow();
</script>

<div class="text-updater-node">
  <Handle type="target" position={Position.Top} />
  <div>
    <label for="text">Text:</label>
    <input
      id="text"
      name="text"
      value={data.text}
      oninput={(evt) => {
        updateNodeData(id, { text: evt.target.value });
      }}
      class="nodrag"
    />
  </div>
  <div class="handle-container">
    <Handle type="source" position={Position.Bottom} id="source-1" />
    <Handle type="source" position={Position.Bottom} id="source-2" />
  </div>
</div>

<style>
  .handle-container {
    display: flex;
    width: 100%;
    justify-content: space-around;
    transform: translateY(100%);
  }

  .handle-container > :global(.svelte-flow__handle) {
    top: auto !important;
    bottom: auto !important;
    left: auto !important;
    right: auto !important;
    position: relative !important;
    transform: none !important;
  }
</style>
