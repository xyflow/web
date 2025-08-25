import { FC, ReactNode } from 'react';

export const dynamic = 'force-static';

const StaticLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return children;
};

export default StaticLayout;
