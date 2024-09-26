<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';

  type $$Props = NodeProps;
  export let data: $$Props['data'];
</script>

<div class="node">
  {data.label}
  <Handle type="source" position={Position.Top} id="a" class="handle" />
  <Handle type="source" position={Position.Right} id="b" class="handle" />
  <Handle type="source" position={Position.Bottom} id="c" class="handle" />
  <Handle type="source" position={Position.Left} id="d" class="handle" />
</div>

<style>
  .node {
    width: 50px;
    height: 50px;
    font-size: 2em;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* handing down scoped styles to child components not possible :(  */
  /* https://github.com/sveltejs/svelte/issues/6972 */
  :global(.svelte-flow .handle) {
    background-color: #aaa;
  }
</style>
