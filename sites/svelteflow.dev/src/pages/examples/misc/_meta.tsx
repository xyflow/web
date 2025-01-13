import { getMetaConfigFromTitleLookup } from 'xy-shared';

const titleLookup = {
  'download-image': 'Download Image',
  'threlte-flow': 'Threlte Flow',
  'use-svelte-flow': 'useSvelteFlow',
};

export default getMetaConfigFromTitleLookup(titleLookup, '/examples/misc');
