import { fetchJSON } from 'xy-shared';

export default async function getStaticProps() {
  const { stargazers_count: stars = 0 } = await fetchJSON(process.env.GITHUB_API_URL);
  const { downloads = 0 } = await fetchJSON(process.env.NPM_SVELTE_FLOW);

  if (!downloads || !stars) {
    console.warn('could not fetch downloads, stars or version. please try again.');
  }

  return {
    stars,
    downloads,
  };
}
