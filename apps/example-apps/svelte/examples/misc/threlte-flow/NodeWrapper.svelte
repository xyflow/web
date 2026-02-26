<script lang="ts">
  let { label }: { label: string } = $props();
</script>

<div
  class="flex flex-col border border-solid h-full rounded-2xl shadow-[0_7px_9px_0_rgba(0,0,0,0.02)] theme-node"
>
  <div
    class="theme-node-header text-xs px-3 py-2 border-b border-solid font-mono font-semibold rounded-t-2xl family-mono"
  >
    {label}
  </div>
  <div
    class="relative flex rounded-b-2xl family-sans font-light text-xs theme-node-content"
  >
    <slot />
  </div>
</div>
