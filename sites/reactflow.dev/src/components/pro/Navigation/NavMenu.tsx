'use client';

import { NavMenuNotLoggedIn } from './NavMenuNotLoggedIn';

import { NavMenuLoggedIn } from './NavMenuLoggedIn';
import useSubscription from '@/hooks/useSubscription';

function NavMenu() {
  const { isLoading, user, refetchUser } = useSubscription();

  return user && !isLoading ? (
    <NavMenuLoggedIn isLoading={isLoading} user={user} refetchUser={refetchUser} />
  ) : (
    <NavMenuNotLoggedIn />
  );
}

export default NavMenu;
