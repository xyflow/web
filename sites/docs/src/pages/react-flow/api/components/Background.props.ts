import { type PropsTableProps } from '@/components/props-table';
import * as Types from '../types/_meta.json';

const links = {
  // Local links
  BackgroundVariant: '#backgroundvariant',

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

export const backgroundProps: PropsTableProps = {
  props: [
    ['id?', 'string'],
    ['color?', 'string'],
    ['bgColor?', 'string'],
    ['className?', 'string'],
    ['patternClassName?', 'string'],
    ['gap?', 'number | [number, number]', '28'],
    ['size?', 'number'],
    ['offset?', 'number', '2'],
    ['lineWidth?', 'number', '1'],
    ['variant?', 'BackgroundVariant', 'BackgroundVariant.Dots'],
    ['style?', 'React.CSSProperties'],
  ],
  links: links,
};
