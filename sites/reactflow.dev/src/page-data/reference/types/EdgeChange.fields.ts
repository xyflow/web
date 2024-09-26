import { type PropsTableProps } from 'xy-shared';

export const edgeAddChangeFields: PropsTableProps = {
  props: [
    { name: 'type', type: '"add"' },
    { name: 'item', type: 'Edge<T>' },
    { name: 'index', type: 'number | undefined' },
  ],
};

export const edgeRemoveChangeFields: PropsTableProps = {
  props: [
    { name: 'type', type: '"remove"' },
    { name: 'id', type: 'string' },
  ],
};

export const edgeReplaceChangeFields: PropsTableProps = {
  props: [
    { name: 'type', type: '"replace"' },
    { name: 'id', type: 'string' },
    { name: 'item', type: 'Edge<T>' },
  ],
};

export const edgeSelectionChangeFields: PropsTableProps = {
  props: [
    { name: 'type', type: '"select"' },
    { name: 'id', type: 'string' },
    { name: 'selected', type: 'boolean' },
  ],
};
