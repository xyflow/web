// TODO: remove this file after Nextra 4 migration
import { useConfig } from 'nextra-theme-docs';
import { useData } from 'nextra/hooks';

import { createContext } from 'react';

type SharedContext = {
  useConfig: typeof useConfig;
  useData: typeof useData;
};

export const SharedContext = createContext<SharedContext>({} as SharedContext);
