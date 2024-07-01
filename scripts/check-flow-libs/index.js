import { FlowLibUpdater } from './flow-lib-updater.js';

const reactFlowUpdater = await FlowLibUpdater({
  site: 'reactflow.dev',
  packageName: 'reactflow',
  envKey: 'NEXT_PUBLIC_REACT_FLOW_VERSION',
});
const reactFlowUpdated = await reactFlowUpdater.start();

if (reactFlowUpdated) {
  console.log('updated reactflow');
}

const svelteFlowUpdater = await FlowLibUpdater({
  site: 'svelteflow.dev',
  packageName: '@xyflow/svelte',
  envKey: 'NEXT_PUBLIC_SVELTE_FLOW_VERSION',
});
const svelteFlowUpdated = await svelteFlowUpdater.start();

if (svelteFlowUpdated) {
  console.log('updated @xyflow/svelte');
}
