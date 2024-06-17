import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { readFile, writeFile } from 'fs/promises';
import latestVersion from 'latest-version';
import { exec } from '@actions/exec';
import { parse as parseEnv, stringify as stringifyEnv } from 'envfile';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * This is a helper function for checking the latest version on npm against the version in the .env file for a specific site.
 * You need to create the helper and then call the start method to check the version.
 */
export async function FlowLibUpdater({ siteName, packageName, envKey }) {
  const sitePath = resolve(__dirname, `../../sites/${siteName}`);
  const latestNpmVersion = await latestVersion(packageName);
  const envPath = resolve(sitePath, '.env');
  const envContent = await readFile(envPath);
  const envParsed = parseEnv(envContent);
  const currentVersion = envParsed[envKey];

  // writes the latest version from npm to the .env file
  async function updateEnv() {
    console.log(`update ${packageName} .env file`);

    if (!envParsed[envKey]) {
      console.log(`couldn't find ${envKey} in .env file ${packagePath}`);
      return;
    }

    envParsed[versionKey] = latestNpmVersion;

    const envUpdated = stringifyEnv(envParsed);

    await writeFile(envPath, envUpdated);
  }

  // updates all workspaces that use the package
  async function updatePkgs() {
    console.log(`update ${packageName} dependencies`);

    await exec(`pnpm`, [
      `--recursive`,
      `-C=${__dirname}/../../`,
      'update',
      `${packageName}@${latestNpmVersion}`,
    ]);
  }

  return {
    async start() {
      if (!areVersionsEqual(currentVersion, latestNpmVersion)) {
        await updatePkgs();
        await updateEnv();

        return latestNpmVersion;
      }

      return null;
    },
  };
}

// utils

function areVersionsEqual(a, b) {
  if (!a || !b) {
    return false;
  }

  const versionA = a.replace('^', '');
  const versionB = b.replace('^', '');

  return versionA === versionB;
}
