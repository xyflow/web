import { getMetaConfigFromTitleLookup } from 'xy-shared';

const titleLookup = {
  'base-style': 'Base Style',
  'dark-mode': 'Dark Mode',
  tailwind: 'Tailwind',
  'turbo-flow': 'Turbo Flow',
};

export default getMetaConfigFromTitleLookup(titleLookup, '/examples/styling');
