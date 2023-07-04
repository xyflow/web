import { SandpackPredefinedTemplate } from '@codesandbox/sandpack-react/types';

import { Framework } from '@/types';
import { REACT_FLOW_VERSION, SVELTE_FLOW_VERSION } from '@/constants';

export function getScriptExtension({
  framework,
  isTypescript,
}: {
  framework: Framework;
  isTypescript: boolean;
}) {
  if (framework === 'svelte') {
    return 'svelte';
  }

  return isTypescript ? 'tsx' : 'js';
}

export function getTemplate({
  framework,
  isTypescript,
}: {
  framework: Framework;
  isTypescript: boolean;
}): SandpackPredefinedTemplate {
  if (framework === 'svelte') {
    return 'svelte';
  }

  return isTypescript ? 'react-ts' : 'react';
}

const defaultSetupReact = {
  dependencies: {
    reactflow: REACT_FLOW_VERSION,
  },
};

const defaultSetupSvelte = {
  dependencies: {
    '@xyflow/svelte': SVELTE_FLOW_VERSION,
  },
  devDependencies: {
    svelte: '3.58.0',
  },
};

export function getDefaultSetup(framework: Framework) {
  return framework === 'svelte' ? defaultSetupSvelte : defaultSetupReact;
}
