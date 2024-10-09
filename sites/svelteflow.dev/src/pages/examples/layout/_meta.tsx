import { getMetaConfigFromTitleLookup } from 'xy-shared';

const titleLookup = {
  dagre: 'Dagre',
  elkjs: 'Elkjs',
  'horizontal-flow': 'Horizontal Flow',
  subflows: 'Subflows',
};

export default getMetaConfigFromTitleLookup(titleLookup, '/examples/layout');
