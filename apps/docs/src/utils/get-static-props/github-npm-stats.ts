export default async function getStaticProps({ params }) {
  const GITHUB_API_URL = 'https://api.github.com/repos/wbkd/react-flow';
  const REACT_FLOW_RENDERER_DOWNLOADS_URL =
    'https://api.npmjs.org/downloads/point/last-week/react-flow-renderer';
  const REACTFLOW_DOWNLOADS_URL =
    'https://api.npmjs.org/downloads/point/last-week/reactflow';

  const fetchJSON = async function (url) {
    return new Promise((resolve, reject) => {
      fetch(url, { headers: { 'User-Agent': 'webkid' } })
        .then((res) => res.json())
        .then((response) => {
          resolve(response);
        });
    });
  };

  const { stargazers_count: stars } = await fetchJSON(GITHUB_API_URL);
  const { downloads: reactFlowRendererDownloads } = await fetchJSON(
    REACT_FLOW_RENDERER_DOWNLOADS_URL
  );
  const { downloads: reactFlowDownloads } = await fetchJSON(
    REACTFLOW_DOWNLOADS_URL
  );

  const downloads = reactFlowRendererDownloads + reactFlowDownloads;

  if (!downloads || !stars) {
    return console.log(
      'could not fetch downloads and stars. please try again.'
    );
  }

  return {
    props: {
      ssg: {
        stars,
        downloads,
      },
    },
    revalidate: 360,
  };
}
