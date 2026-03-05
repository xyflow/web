<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte';

  let { data }: NodeProps = $props();
</script>

<div class="px-4 py-2 shadow-md rounded-md bg-white dark:bg-gray-800 border-2 border-stone-400 dark:border-gray-600">
  <div class="flex">
    <div
      class="rounded-full w-12 h-12 flex justify-center items-center bg-teal-100 dark:bg-gray-700"
    >
      {data.emoji}
    </div>
    <div class="ml-2">
      <div class="text-lg font-bold text-gray-900 dark:text-gray-100">{data.name}</div>
      <div class="text-gray-500 dark:text-gray-400">{data.job}</div>
    </div>
  </div>
  <Handle
    type="target"
    position={Position.Top}
    class="!w-16 h-2 !bg-teal-500 dark:!bg-teal-400 rounded-none border-none"
  />
  <Handle
    type="source"
    position={Position.Bottom}
    class="!w-16 h-2 !bg-teal-500 dark:!bg-teal-400 rounded-none border-none"
  />
</div>
