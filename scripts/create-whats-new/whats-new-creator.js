import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { writeFile, stat } from 'fs/promises';

import latestVersion from 'latest-version';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * This is a helper function for checking the latest version on npm against the version in the .env file for a specific site.
 * You need to create the helper and then call the start method to check the version.
 */
export async function WhatsNewCreator({ site, packageName }) {
  const sitePath = resolve(__dirname, `../../sites/${site}`);
  const latestNpmVersion = await latestVersion(packageName);
  const ghApiUrl = `https://api.github.com/repos/xyflow/xyflow/releases/tags/${packageName}@${latestNpmVersion}`;

  async function getReleaseNotes() {
    console.log('request release notes for', ghApiUrl);

    const releaseNotes = await fetch(ghApiUrl, {
      headers: {
        Authorization: process.env.GITHUB_TOKEN,
        Accept: 'application/vnd.github+json',
      },
    });
    const releaseJson = await releaseNotes.json();

    return releaseJson.body;
  }

  async function writeWhatsNew(fileName, content) {
    console.log(`write whats new page for ${site}`);

    const whatsNewPath = resolve(
      sitePath,
      'src',
      'pages',
      'whats-new',
      `${fileName}.mdx`,
    );

    if (await fileExists(whatsNewPath)) {
      console.log(
        `Can't write file. What's new file ${fileName} already exists!`,
      );
      return null;
    }

    await writeFile(whatsNewPath, content);
    return true;
  }

  function getMdContent(date, body) {
    return `---
title: "New Release ${latestNpmVersion}"
description: "What's new in ${packageName} ${latestNpmVersion}"
authors: [moritz]
date: "${date.toString()}"
---
    
# ${latestNpmVersion}
    
${body}`;
  }

  return {
    async start() {
      const releaseNotes = await getReleaseNotes();
      const today = new Date().toISOString().slice(0, 10);
      const mdContent = getMdContent(today, releaseNotes);
      const createdWhatsNew = await writeWhatsNew(today, mdContent);

      return createdWhatsNew;
    },
  };
}

const fileExists = async (pathName) =>
  !!(await stat(pathName).catch((e) => false));
