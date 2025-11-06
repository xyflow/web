import { NavMenuNotLoggedIn } from './NavMenuNotLoggedIn';

import { NavMenuLoggedIn } from './NavMenuLoggedIn';
import { getNhost } from '@/utils/nhost';

async function NavMenu() {
  const nhost = await getNhost();
  const isAuthenticated = !!nhost.getUserSession();

  return isAuthenticated ? <NavMenuLoggedIn /> : <NavMenuNotLoggedIn />;
}

export default NavMenu;
