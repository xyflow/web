import { useConfig } from 'nextra-theme-docs';
import { compileMdx } from 'nextra/compile';
import { useData } from 'nextra/hooks';

import { createContext } from 'react';

type SharedContext = {
  useConfig: typeof useConfig;
  compileMdx: typeof compileMdx;
  useData: typeof useData;
};

export const SharedContext = createContext<SharedContext>({} as SharedContext);
