import { fetchJSON } from '../lib';

const LIBRARY_CONFIG = {
  react: {
    githubUrl: 'https://api.github.com/repos/xyflow/xyflow',
    npmUrls: [
      'https://api.npmjs.org/downloads/point/last-week/react-flow-renderer',
      'https://api.npmjs.org/downloads/point/last-week/reactflow',
      'https://api.npmjs.org/downloads/point/last-week/@xyflow/react',
    ],
  },
  svelte: {
    githubUrl: 'https://api.github.com/repos/xyflow/xyflow',
    npmUrls: ['https://api.npmjs.org/downloads/point/last-week/@xyflow/svelte'],
  },
} as const;

export type Library = keyof typeof LIBRARY_CONFIG;

export async function fetchGitHubNpmStats(library: Library) {
  const config = LIBRARY_CONFIG[library];

  const { stargazers_count: stars = 0 } = await fetchJSON(config.githubUrl);

  const downloadPromises = config.npmUrls.map((url) => fetchJSON(url));
  const downloadResults = await Promise.all(downloadPromises);

  const downloads = downloadResults.reduce(
    (total, result) => total + (result.downloads || 0),
    0,
  );

  if (!downloads || !stars) {
    console.warn('could not fetch downloads and stars. please try again.');
  }

  return { stars, downloads };
}

