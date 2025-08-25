import { FC, ReactNode } from 'react';

export const dynamic = 'force-static';
export const dynamicParams = false;

const StaticLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return children;
};

export default StaticLayout;
