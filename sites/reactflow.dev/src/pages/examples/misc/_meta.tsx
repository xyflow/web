import { getMetaConfigFromTitleLookup } from 'xy-shared';

const titleLookup = {
  'static-server-side-generation': 'Static Server Side Generation',
  'download-image': 'Download Image',
  provider: 'ReactFlowProvider',
  'use-react-flow-hook': 'useReactFlow',
};

export default getMetaConfigFromTitleLookup(titleLookup, '/examples/misc');
