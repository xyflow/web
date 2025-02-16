'use client';

import { FC, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useFathom } from 'xy-shared';
import { fontClassNames, ntDapperFont } from 'xy-shared/fonts';
import { cn } from '@xyflow/xy-ui';

const fathomOptions = {
  id: 'LXMRMWLB',
  domains: ['reactflow.dev'],
};

export const Html: FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  // we need this to be able to override nextra theme styles for specific pages
  const routeSegment = pathname.split('/', 2)[1];
  // TODO: make works this hook
  // useFathom(fathomOptions);
  return (
    <html
      className={cn(ntDapperFont.className, routeSegment)}
      dir="ltr"
      lang="en"
      suppressHydrationWarning
    >
      {children}
    </html>
  );
};
