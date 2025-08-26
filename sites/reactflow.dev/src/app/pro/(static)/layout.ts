import { FC, ReactNode } from 'react';

// TODO check if we can have static layout here
export const dynamic = 'force-dynamic';

const Layout: FC<{ children: ReactNode }> = ({ children }) => children;

export default Layout;
