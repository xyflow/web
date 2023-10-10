import { DocSearch } from '@docsearch/react';

import '@docsearch/css';

// the facet filter works, because we add a custom docsearch meta tag to each site like:
// <meta name="docsearch:site" content="react" /> (can be found in the theme.config.jsx file)
// and added it as a facet in the algolia settings

// @todo add credentials from env vars here
function Search() {
  return (
    <DocSearch
      appId="SKBTPFY0OZ"
      apiKey="2255d527d2a69873f33a7db9789318de"
      indexName="xyflow--git-staging-xyflow"
      searchParameters={{
        facetFilters: [`site:react`],
      }}
      placeholder={undefined}
    />
  );
}

export { Search };
