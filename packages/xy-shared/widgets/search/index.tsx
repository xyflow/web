'use client';

import { DocSearch } from '@docsearch/react';
import { FC } from 'react';
import '@docsearch/css';

const appId = process.env.NEXT_PUBLIC_ALGOLIA_ID;
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY;
const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME;

export const Search: FC = () => {
  if (!appId || !apiKey || !indexName) {
    return null;
  }
  return (
    <DocSearch
      appId={appId}
      apiKey={apiKey}
      indexName={indexName}
      placeholder={undefined}
    />
  );
};
