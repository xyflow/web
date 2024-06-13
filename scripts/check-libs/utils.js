import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { readFile, writeFile } from 'fs/promises';
import { exec } from '@actions/exec';
import { parse as parseEnv, stringify as stringifyEnv } from 'envfile';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function getPackageJSON(packagePath) {
  const json = JSON.parse(
    await readFile(
      new URL(resolve(packagePath, 'package.json'), import.meta.url),
    ),
  );

  return json;
}

export async function updatePkgs(packageName, version) {
  console.log(`update ${packageName} for all workspaces`);

  await exec(`pnpm`, [
    `--recursive`,
    `-C=${__dirname}/../../`,
    'update',
    `${packageName}@${version}`,
  ]);
}

export async function getParsedEnv(envPath) {
  const envContent = await readFile(envPath);
  const envParsed = parseEnv(envContent);

  return envParsed;
}

export async function updateEnvVersion(packagePath, versionKey, version) {
  console.log(`update ${packagePath} .env file`);

  const envPath = resolve(packagePath, '.env');
  const envParsed = await getParsedEnv(envPath);

  if (!envParsed[versionKey]) {
    console.log(`couldn't find ${versionKey} in .env file ${packagePath}`);
    return;
  }

  envParsed[versionKey] = version;

  const envUpdated = stringifyEnv(envParsed);

  await writeFile(envPath, envUpdated);
}

export function areVersionsEqual(a, b) {
  if (!a || !b) {
    return false;
  }

  const versionA = a.replace('^', '');
  const versionB = b.replace('^', '');

  return versionA === versionB;
}
