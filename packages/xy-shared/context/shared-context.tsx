import { useConfig } from 'nextra-theme-docs';
import { useData } from 'nextra/hooks';

import { createContext } from 'react';

type SharedContext = {
  useConfig: typeof useConfig;
  useData: typeof useData;
};

export const SharedContext = createContext<SharedContext>({} as SharedContext);
