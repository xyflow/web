import { getMetaConfigFromTitleLookup } from 'xy-shared';

const titleLookup = {
  introduction: 'Introduction',
  'terms-and-definitions': 'Terms and Definitions',
  'core-concepts': 'Core Concepts',
  'the-viewport': 'The Viewport',
  'built-in-components': 'Built-In Components',
};

export default getMetaConfigFromTitleLookup(titleLookup, '/learn/concepts');
