import dotenv from 'dotenv';
import { WhatsNewCreator } from './whats-new-creator.js';

dotenv.config({ path: '.env.local' });

const reactFlowCreator = await WhatsNewCreator({
  site: 'reactflow.dev',
  packageName: '@xyflow/react',
});
const reactFlowUpdated = await reactFlowCreator.start();

if (reactFlowUpdated) {
  console.log('updated React Flow');
}

// no Svelte Flow releases yet
// const svelteFlowCreator = await WhatsNewCreator({
//   site: 'svelteflow.dev',
//   packageName: '@xyflow/svelte',
// });
// const svelteFlowUpdated = await svelteFlowCreator.start();

// if (svelteFlowUpdated) {
//   console.log('updated Svelte Flow');
// }
