'use client'

import { FC } from 'react';
import { useIsPro } from '@/utils';
import { Search as XYSearch } from 'xy-shared';

export const Search: FC = (props) => {
  const isPro = useIsPro();

  if (isPro) {
    return null;
  }

  return <XYSearch {...props} />;
}
