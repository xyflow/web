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
    return 'vite-svelte';
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
    'd3-path': '1',
    'd3-dispatch': '1',
    'd3-color': '1',
    'd3-ease': '1',
    'd3-interpolate': '1',
    'd3-timer': '1',
    'd3-drag': '2',
    'd3-transition': '2',
    '@xyflow/svelte': SVELTE_FLOW_VERSION,
  },
  devDependencies: {
    svelte: '4',
  },
};

export function getDefaultSetup(framework: Framework) {
  return framework === 'svelte' ? defaultSetupSvelte : defaultSetupReact;
}
