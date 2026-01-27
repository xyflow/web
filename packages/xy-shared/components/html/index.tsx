'use client';

import { FC, ReactNode } from 'react';
import { ntDapperFont } from '../../fonts/index';
import { cn } from '../../lib/utils';

export const Html: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html
      className={cn(ntDapperFont.className)}
      dir="ltr"
      lang="en"
      suppressHydrationWarning
    >
      {children}
    </html>
  );
};
