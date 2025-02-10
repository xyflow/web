import { getMetaConfigFromTitleLookup } from 'xy-shared';

const titleLookup = {
  'installation-and-requirements': 'Installation',
  'building-a-flow': 'Building a Flow',
  'adding-interactivity': 'Adding Interactivity',
};

export default getMetaConfigFromTitleLookup(
  titleLookup,
  '/learn/getting-started',
);
