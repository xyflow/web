import { useConfig } from 'nextra-theme-docs';
import { compileMdx } from 'nextra/compile';
import { useData } from 'nextra/hooks';

import { createContext } from 'react';

export const SharedContext = createContext({ useConfig, compileMdx, useData });
