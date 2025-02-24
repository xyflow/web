'use client';

import { FC, ReactNode } from 'react';
import { ntDapperFont } from 'xy-shared/fonts';

export const Html: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html
      className={ntDapperFont.className}
      dir="ltr"
      lang="en"
      suppressHydrationWarning
    >
      {children}
    </html>
  );
};
