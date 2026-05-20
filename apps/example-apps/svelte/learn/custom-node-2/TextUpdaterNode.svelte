<script lang="ts">
  import { Handle, Position } from '@xyflow/svelte';
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
    border: var(--xy-node-border-default);
    padding: 5px;
    border-radius: 5px;
    background: var(--xy-node-background-color-default);
    color: var(--xy-node-color-default);
  }

  .text-updater-node label {
    display: block;
    font-size: 12px;
  }
</style>
