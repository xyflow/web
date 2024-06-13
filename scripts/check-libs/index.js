import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import latestVersion from 'latest-version';
import {
  areVersionsEqual,
  getPackageJSON,
  updatePkgs,
  updateEnvVersion,
  getParsedEnv,
} from './utils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * React Flow
 */
const REACTFLOW_PACKAGE = 'reactflow';
const REACTFLOW_ENV_KEY = 'NEXT_PUBLIC_REACT_FLOW_VERSION';
const rfLatestVersion = await latestVersion(REACTFLOW_PACKAGE);

const rfRootPath = resolve(__dirname, '../../sites/reactflow.dev');
const rfPkg = await getPackageJSON(rfRootPath);
const rfPgkVersion = rfPkg.dependencies[REACTFLOW_PACKAGE];
const rfEqual = areVersionsEqual(rfLatestVersion, rfPgkVersion);

if (!rfEqual) {
  console.log(`update all ${REACTFLOW_PACKAGE} dependencies`);

  updatePkgs(REACTFLOW_PACKAGE, rfLatestVersion);

  updateEnvVersion(rfRootPath, REACTFLOW_ENV_KEY, rfLatestVersion);
}

/**
 * Svelte Flow
 */
const SVELTEFLOW_PACKAGE = '@xyflow/svelte';
const SVELTEFLOW_ENV_KEY = 'NEXT_PUBLIC_SVELTE_FLOW_VERSION';
const sfLatestVersion = await latestVersion(SVELTEFLOW_PACKAGE);

const sfRootPath = resolve(__dirname, '../../sites/svelteflow.dev');
const sfEnvParsed = await getParsedEnv(resolve(sfRootPath, '.env'));
const sfEnvVersion = sfEnvParsed[SVELTEFLOW_ENV_KEY];
const sfEqual = areVersionsEqual(sfLatestVersion, sfEnvVersion);

if (!sfEqual) {
  console.log(
    `update ${SVELTEFLOW_PACKAGE} from ${sfEnvVersion} to ${sfLatestVersion}`,
  );

  updatePkgs(SVELTEFLOW_PACKAGE, sfLatestVersion);

  updateEnvVersion(sfRootPath, SVELTEFLOW_ENV_KEY, sfLatestVersion);
}
