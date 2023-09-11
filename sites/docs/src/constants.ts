import { isDevelopment } from '@/utils';

// versions used in the examples
export const REACT_FLOW_VERSION = '11.8.3';
export const SVELTE_FLOW_VERSION = '0.0.14';

// pro examples
export const REACT_PRO_EXAMPLE_BASE_URL =
  'https://xyflow-react-pro-examples.vercel.app/';

export const SVELTE_PRO_EXAMPLE_BASE_URL =
  'https://xyflow-svelte-pro-examples.vercel.app/';

// pro platform
export const PRO_PLATFORM_URL = isDevelopment()
  ? 'http://localhost:3000'
  : 'https://pro.xyflow.com';
export const PRO_PLATFORM_SIGNUP_URL = `${PRO_PLATFORM_URL}/signup`;
export const PRO_PLATFORM_OR_REACT_PRO_URL = `${PRO_PLATFORM_URL}/auth-redirect?path=/&fallback=/react-flow/pro`;

// stats via github and npm
export const GITHUB_API_URL = 'https://api.github.com/repos/wbkd/react-flow';
export const NPM_REACT_FLOW_LEGACY =
  'https://api.npmjs.org/downloads/point/last-week/react-flow-renderer';
export const NPM_REACTFLOW =
  'https://api.npmjs.org/downloads/point/last-week/reactflow';

// url of sveltekit instance serving examples/guides
export const SVELTE_EXAMPLES_URL = isDevelopment()
  ? 'http://localhost:5173/'
  : 'https://xyflow-svelte-examples.vercel.app';
