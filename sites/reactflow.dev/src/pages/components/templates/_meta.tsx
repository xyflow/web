import { getMetaConfigFromTitleLookup } from 'xy-shared';

const titleLookup = {
  'workflow-editor': {
    title: 'Workflow Editor',
    theme: {
      toc: false,
    },
  },
};

export default getMetaConfigFromTitleLookup(
  titleLookup,
  '/components/templates',
);
