import { getMetaConfigFromTitleLookup } from 'xy-shared';

const titleLookup = {
  accessibility: 'Accessibility',
  testing: 'Testing',
  typescript: 'TypeScript',
  'uncontrolled-flow': 'Uncontrolled Flows',
  'state-management': 'State Management',
  'computing-flows': 'Computing Flows',
  'ssr-ssg-configuration': 'Server Side Rendering',
  'devtools-and-debugging': 'Devtools',
};

export default getMetaConfigFromTitleLookup(titleLookup, '/learn/advanced-use');
