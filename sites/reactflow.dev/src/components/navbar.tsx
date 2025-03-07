import { FC } from 'react';
import { LogoLabel } from '@xyflow/xy-ui';
import { Navbar as NextraNavbar } from 'nextra-theme-docs';
import NavMenu from './pro/Navigation/NavMenu';
import { getNhost } from '@/utils/nhost';

export const Navbar: FC<{ children }> = async ({ children }) => {
  const nhost = await getNhost();
  const isAuthenticated = nhost.auth.isAuthenticated();
  return (
    <NextraNavbar
      align="left"
      logo={
        <LogoLabel label="React Flow" labelClassName="mr-5 md:max-lg:hidden" />
      }
      logoLink={false}
    >
      <>
        {children}
        <NavMenu isAuthenticated={isAuthenticated} />
      </>
    </NextraNavbar>
  );
};
