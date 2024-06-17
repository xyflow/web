import { FlowLibUpdater } from './flow-lib-updater.js';

const reactFlowUpdater = await FlowLibUpdater({
  packageName: 'reactflow',
  envKey: 'NEXT_PUBLIC_REACT_FLOW_VERSION',
  siteName: 'reactflow.dev',
});
const reactFlowUpdated = await reactFlowUpdater.start();

if (reactFlowUpdated) {
  console.log('updated reactflow');
}

const svelteFlowUpdater = await FlowLibUpdater({
  packageName: '@xyflow/svelte',
  envKey: 'NEXT_PUBLIC_SVELTE_FLOW_VERSION',
  siteName: 'svelteflow.dev',
});
const svelteFlowUpdated = await svelteFlowUpdater.start();

if (svelteFlowUpdated) {
  console.log('updated @xyflow/svelte');
}
