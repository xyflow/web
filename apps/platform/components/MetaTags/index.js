import Head from 'next/head';

function MetaTags() {
  return (
    <Head>
      <title>React Flow Pro</title>
      <meta name="title" content="React Flow Pro" />
      <meta
        name="description"
        content="Subscribe to React Flow Pro to get access to exclusive features of React Flow, a highly customizable library for building node-based editors, interactive graphs and flow charts"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@reactflowdev" />
      <meta name="twitter:title" content="React Flow Pro" />
      <meta
        name="twitter:description"
        content="Subscribe to React Flow Pro to get access to exclusive features of React Flow, a highly customizable library for building node-based editors, interactive graphs and flow charts"
      />
      <meta name="twitter:image" content="https://reactflow.dev/img/social/social.jpeg" />
      <meta property="og:title" content="React Flow Pro" />
      <meta property="og:url" content="https://pro.reactflow.dev" />
      <meta property="og:image" content="https://reactflow.dev/img/social/social.jpeg" />
    </Head>
  );
}

export default MetaTags;
