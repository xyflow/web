import { HeartIcon } from '@heroicons/react/24/outline';

export type ExampleCode = {
  files: Record<string, string>;
  dependencies: Record<string, string>;
};

export type HeroIcon = typeof HeartIcon;
export type Framework = 'react' | 'svelte';
