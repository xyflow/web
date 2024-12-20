import { getMetaConfigFromTitleLookup } from 'xy-shared';

const titleLookup = {
  'interaction-props': 'Interaction Props',
  'drag-and-drop': 'Drag and Drop',
  'computing-flows': 'Computing Flows',
  validation: 'Validation',
  'connection-events': 'Connection Events',
  'prevent-cycles': 'Preventing Cycles',
  'undo-redo': 'Undo and Redo',
  'copy-paste': 'Copy and Paste',
  'helper-lines': 'Helper Lines',
  'touch-device': 'Touch Device',
  'save-and-restore': 'Save and Restore',
  'zoom-transitions': 'Zoom Transitions',
  collaborative: 'Collaborative',
  'contextual-zoom': 'Contextual Zoom',
};

export default getMetaConfigFromTitleLookup(
  titleLookup,
  '/examples/interaction',
);
