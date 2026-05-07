<script lang="ts">
  import type { Snippet } from 'svelte';

  let { label, children }: { label: string; children: Snippet } = $props();
</script>

<div
  class="flex flex-col border border-solid h-full rounded-2xl shadow-[0_7px_9px_0_rgba(0,0,0,0.05)] bg-white/80 dark:bg-zinc-900/80 border-gray-200 dark:border-zinc-700 backdrop-blur-sm"
>
  <div
    class="text-xs px-3 py-2 border-b border-solid font-mono font-semibold rounded-t-2xl border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300"
  >
    {label}
  </div>
  <div class="relative flex rounded-b-2xl text-xs text-gray-600 dark:text-gray-400">
    {@render children()}
  </div>
</div>
