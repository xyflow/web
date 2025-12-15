'use client';

import { FC, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { ntDapperFont } from '../../fonts';
import { cn } from '../../';

export const Html: FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  // we need this to be able to override nextra theme styles for specific pages
  const routeSegment = pathname.split('/', 2)[1];

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
