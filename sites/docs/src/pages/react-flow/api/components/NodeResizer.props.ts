import { type PropsTableProps } from '@/components/props-table';
import * as Types from '../types/_meta.json';

const links = {
  // External links
  CSSProperties:
    'https://github.com/DefinitelyTyped/DefinitelyTyped/blob/61c7bb49838a155b2b0476bb97d5e707ca80a23b/types/react/v17/index.d.ts#L1545',

  // Types docs
  ...Object.fromEntries(
    Object.keys(Types).map((t) => [
      t.split('.')[0],
      `/react-flow/api/types/${t}`,
    ])
  ),
};

export const nodeResizerProps: PropsTableProps = {
  props: [
    ['nodeId?', 'string'],
    ['color?', 'string'],
    ['handleClassName?', 'string'],
    ['handleStyle?', 'React.CSSProperties'],
    ['lineClassName?', 'string'],
    ['lineStyle?', 'React.CSSProperties'],
    ['isVisible?', 'boolean'],
    ['minWidth?', 'number'],
    ['minHeight?', 'number'],
    ['maxWidth?', 'number'],
    ['maxHeight?', 'number'],
    ['keepAspectRatio?', 'boolean'],
    ['shouldResize?', 'ShouldResize'],
    ['onResizeStart?', 'OnResizeStart'],
    ['onResize?', 'OnResize'],
    ['onResizeEnd?', 'OnResizeEnd'],
  ],
  links: links,
};
