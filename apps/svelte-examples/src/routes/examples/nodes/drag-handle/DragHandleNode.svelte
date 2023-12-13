<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';

  type $$Props = NodeProps;
</script>

<Handle type="target" position={Position.Left} />
<div class="label">
  Only draggable here →
  <!-- Use the class specified at node.dragHandle here -->
  <span class="drag-handle custom-drag-handle" />
</div>
<Handle type="source" position={Position.Right} />

<style>
  .label {
    display: flex;
    align-items: center;
  }

  .drag-handle {
    display: inline-block;
    width: 25px;
    height: 25px;
    background-color: teal;
    margin-left: 5px;
    border-radius: 50%;
  }
</style>
