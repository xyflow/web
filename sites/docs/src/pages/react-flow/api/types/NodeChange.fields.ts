import { type PropsTableProps } from '@/components/props-table';
import * as Types from './_meta.json';

const links = Object.fromEntries(
  Object.keys(Types).map((t) => [t.split('.')[0], `/react-flow/api/types/${t}`])
);

export const nodeDimensionChangeFields: PropsTableProps = {
  props: [
    ['id', 'string'],
    ['type', '"dimensions"'],
    ['dimensions?', 'Dimensions'],
    ['updateStyle?', 'boolean'],
    ['resizing?', 'boolean'],
  ],
};

export const nodePositionChangeFields: PropsTableProps = {
  props: [
    ['id', 'string'],
    ['type', '"position"'],
    ['position?', 'XYPosition'],
    ['positionAbsolute?', 'XYPosition'],
    ['dragging?', 'boolean'],
  ],
};

export const nodeSelectionChangeFields: PropsTableProps = {
  props: [
    ['id', 'string'],
    ['type', '"select"'],
    ['selected', 'boolean'],
  ],
};

export const nodeRemoveChangeFields: PropsTableProps = {
  props: [
    ['id', 'string'],
    ['type', '"remove"'],
  ],
};

export const nodeAddChangeFields: PropsTableProps = {
  props: [
    ['item', 'Node<T>'],
    ['type', '"add"'],
  ],
};

export const nodeResetChangeFields: PropsTableProps = {
  props: [
    ['item', 'Node<T>'],
    ['type', '"reset"'],
  ],
};
