import { fetchJSON } from 'xy-shared';

export default async function getStaticProps() {
  const { stargazers_count: stars = 0 } = await fetchJSON(
    process.env.GITHUB_API_URL,
  );
  const { downloads: reactFlowLegacyDownloads = 0 } = await fetchJSON(
    process.env.NPM_REACT_FLOW_LEGACY,
  );
  const { downloads: reactFlowDownloads = 0 } = await fetchJSON(
    process.env.NPM_REACT_FLOW,
  );
  const { downloads: xyflowReactDownloads = 0 } = await fetchJSON(
    process.env.NPM_XYFLOW_REACT,
  );
  const downloads =
    reactFlowLegacyDownloads + reactFlowDownloads + xyflowReactDownloads;

  if (!downloads || !stars) {
    console.log('could not fetch downloads and stars. please try again.');
  }

  return {
    stars,
    downloads,
    revalidate: 60 * 60,
  };
}
