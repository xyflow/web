import { FC, ReactNode } from 'react';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  // const proPageMap = mergeMetaWithPageMap(pageMap, {
  //   pro: { display: 'normal' },
  //   'case-studies': { display: 'normal' },
  // });
  return children;
};

export default Layout;
