import { type PropsTableProps } from 'xy-shared';

export const controlsProps: PropsTableProps = {
  props: [
    { name: 'position?', type: 'PanelPosition', default: '"bottom-left"' },
    { name: 'showZoom?', type: 'boolean', default: 'true' },
    { name: 'showFitView?', type: 'boolean', default: 'true' },
    { name: 'showLock?', type: 'boolean', default: 'true' },
    { name: 'fitViewOptions?', type: 'FitViewOptions' },
    { name: 'buttonBgColor?', type: 'string', default: 'undefined' },
    { name: 'buttonBgColorHover?', type: 'string', default: 'undefined' },
    { name: 'buttonColor?', type: 'string', default: 'undefined' },
    { name: 'buttonColorHover?', type: 'string', default: 'undefined' },
    { name: 'style?', type: 'string', default: 'undefined' },
    { name: 'class?', type: 'string', default: 'undefined' },
    {
      name: 'orientation?',
      type: '"horizontal" | "vertical"',
      default: '"vertical"',
    },
  ],
};
