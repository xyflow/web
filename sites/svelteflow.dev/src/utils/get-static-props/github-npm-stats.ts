export default async function getStaticProps() {
  const { stargazers_count: stars = 0 } = await fetchJSON(
    process.env.GITHUB_API_URL,
  );
  const { downloads = 0 } = await fetchJSON(process.env.NPM_SVELTE_FLOW);

  if (!downloads || !stars) {
    console.log('could not fetch downloads and stars. please try again.');
  }

  return {
    props: {
      ssg: {
        stars,
        downloads,
      },
    },
    revalidate: 60 * 60,
  };
}

// @todo use generic for the return type here?
async function fetchJSON(url: string): Promise<Record<string, any>> {
  let json = {};

  try {
    const resp = await fetch(url, { headers: { 'User-Agent': 'webkid' } });
    json = await resp.json();
  } catch (err) {
    console.log(err);
  }

  return json;
}
