import { getContext } from 'svelte';
import type { Writable } from 'svelte/store';

export const useDnD = () => {
  return getContext('dnd') as Writable<string | null>;
};
