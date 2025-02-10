import { getMetaConfigFromTitleLookup } from 'xy-shared';

const titleLookup = {
  'styled-components': 'Styled Components',
  tailwind: 'Tailwind',
  'turbo-flow': 'Turbo Flow',
  'base-style': 'Base Style',
};

export default getMetaConfigFromTitleLookup(titleLookup, '/examples/styling');
