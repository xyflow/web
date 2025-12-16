'use client';

import { NavMenuNotLoggedIn } from './NavMenuNotLoggedIn';

import { NavMenuLoggedIn } from './NavMenuLoggedIn';
import { useSubscription } from '../../../hooks';

type NavMenuProps = {
  siteName?: 'React Flow' | 'Svelte Flow';
};

function NavMenu({ siteName = 'React Flow' }: NavMenuProps) {
  const { isLoading, user, refetchUser } = useSubscription();

  return user && !isLoading ? (
    <NavMenuLoggedIn isLoading={isLoading} user={user} refetchUser={refetchUser} />
  ) : (
    <NavMenuNotLoggedIn siteName={siteName} />
  );
}

export default NavMenu;
