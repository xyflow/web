import { getMetaConfigFromTitleLookup } from 'xy-shared';

const titleLookup = {
  'computing-flows': 'Computing Flows',
  'context-menu': 'Context Menu',
  'contextual-zoom': 'Contextual Zoom',
  'drag-and-drop': 'Drag and Drop',
  validation: 'Validation',
};

export default getMetaConfigFromTitleLookup(
  titleLookup,
  '/examples/interaction',
);
