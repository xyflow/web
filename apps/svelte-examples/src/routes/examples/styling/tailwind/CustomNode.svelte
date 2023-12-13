<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';

  type $$Props = NodeProps;
  export let data: $$Props['data'];
</script>

<div class="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
  <div class="flex">
    <div class="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
      {data.emoji}
    </div>
    <div class="ml-2">
      <div class="text-lg font-bold">{data.name}</div>
      <div class="text-gray-500">{data.job}</div>
    </div>
  </div>
  <Handle
    type="target"
    position={Position.Top}
    class="w-16 !bg-teal-500 rounded-none border-none"
  />
  <Handle
    type="source"
    position={Position.Bottom}
    class="w-16 !bg-teal-500 rounded-none border-none"
  />
</div>
