<script>
	import { SvelteFlow, Background, Controls, MiniMap } from '@xyflow/svelte';
	import { writable } from 'svelte/store';
	import '@xyflow/svelte/dist/style.css';
	const data = 'world';

	const nodes = writable([
		{
			id: '1',
			type: 'input',
			data: { label: 'Input Node' },
			position: { x: 150, y: 5 }
		},
		{
			id: '2',
			type: 'default',
			data: { label: 'Node' },
			position: { x: 0, y: 150 },
			selectable: false
		},
		{
			id: 'A',
			type: 'default',
			data: { label: 'Styled with class' },
			class: 'custom-style',
			position: { x: 150, y: 150 }
		},
		{
			id: 'D',
			type: 'default',
			data: { label: 'Not draggable' },
			position: { x: 150, y: 200 },
			draggable: false
		}
	]);
	const edges = writable([
		{
			id: '1-2',
			type: 'default',
			source: '1',
			target: '2',
			label: 'Edge Text'
		},
		{
			id: '1-3',
			type: 'smoothstep',
			source: '1',
			target: 'A',
			selectable: false
		},
		{
			id: '2-4',
			source: '2',
			target: 'D',
			animated: true
		}
	]);
</script>

<div style="height:100vh;">
	<SvelteFlow {nodes} {edges} fitView>
		<Background />
		<Controls />
		<MiniMap />
	</SvelteFlow>
</div>
