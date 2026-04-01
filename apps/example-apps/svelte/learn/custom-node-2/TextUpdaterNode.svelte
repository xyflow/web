<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';

  let { data }: NodeProps = $props();
</script>

<div class="text-updater-node">
  <div>Custom Node</div>
  <Handle type="target" position={Position.Top} />
  <Handle type="source" position={Position.Bottom} id="a" style="left: 10px" />
  <Handle type="source" position={Position.Bottom} id="b" />
</div>

<style>
  .text-updater-node {
    height: 50px;
    border: 1px solid #eee;
    padding: 5px;
    border-radius: 5px;
    background: var(--xy-node-background-color-default);
  }

  .text-updater-node label {
    display: block;
    color: var(--xy-node-color-default);
    font-size: 12px;
  }
</style>
