<script lang="ts">
  let { label }: { label: string } = $props();
</script>

<div
  class="flex flex-col border border-solid border-gray-200 h-full rounded-2xl bg-white/70 shadow-[0_7px_9px_0_rgba(0,0,0,0.02)]"
>
  <div
    class="text-xs px-3 py-2 border-b border-solid border-gray-200 font-mono font-semibold rounded-t-2xl family-mono text-[#0F172A]"
  >
    {label}
  </div>
  <div
    class="relative bg-white p-3 flex rounded-b-2xl family-sans font-light text-xs text-[#757575]"
  >
    <slot />
  </div>
</div>
