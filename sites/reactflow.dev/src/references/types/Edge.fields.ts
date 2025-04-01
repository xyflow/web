import { type PropsTableProps } from 'xy-shared';

export const smoothStepEdgeTypeFields: PropsTableProps = {
  props: [
    { name: 'type', type: '"smoothstep"' },
    { name: 'pathOptions?', type: 'object' },
    { name: 'pathOptions.offset?', type: 'number' },
    { name: 'pathOptions.borderRadius?', type: 'number' },
  ],
};

export const bezierEdgeTypeFields: PropsTableProps = {
  props: [
    { name: 'type', type: '"default"' },
    { name: 'pathOptions?', type: 'object' },
    { name: 'pathOptions.curvature?', type: 'number' },
  ],
};
