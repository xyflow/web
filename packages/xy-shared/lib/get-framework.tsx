import { type Framework, type Library } from '../types';

export function getFramework(override?: Framework): { framework: Framework; library: Library } {
  const env = process.env.NEXT_PUBLIC_FRAMEWORK as Framework;
  
  const framework = override || env || 'react';

  let library: Library = 'React Flow';
  switch (framework) {
    case 'react':
      library = 'React Flow';
      break;
    case 'svelte':
      library = 'Svelte Flow';
      break;
  }

  return { framework, library };
}