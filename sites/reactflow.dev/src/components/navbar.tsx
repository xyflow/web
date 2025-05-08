import { FC } from 'react';
import { LogoLabel } from '@xyflow/xy-ui';
import { Navbar as NextraNavbar } from 'nextra-theme-docs';
import NavMenu from './pro/Navigation/NavMenu';

export const Navbar: FC<{ children }> = async ({ children }) => {
  return (
    <NextraNavbar
      align="left"
      logo={<LogoLabel label="React Flow" labelClassName="mr-5 md:max-lg:hidden" />}
      logoLink={false}
    >
      <>
        {children}
        <NavMenu />
      </>
    </NextraNavbar>
  );
};
