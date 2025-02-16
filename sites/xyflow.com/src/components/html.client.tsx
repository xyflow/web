'use client';

import { FC, ReactNode } from 'react';
import { useFathom } from 'xy-shared';
import { ntDapperFont } from 'xy-shared/fonts';

const fathomOptions = {
  id: 'JQTCQNLV',
};

export const Html: FC<{ children: ReactNode }> = ({ children }) => {
  // TODO: make works this hook
  // useFathom(fathomOptions);
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
