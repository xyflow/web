<script lang="ts">
  import { useSvelteFlow, type NodeProps } from '@xyflow/svelte';

  let { id, data }: NodeProps = $props();

  let { updateNodeData } = useSvelteFlow();
</script>

<div class="text-updater-node">
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
</div>
