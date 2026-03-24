import { getHasNhostSession } from '../../lib/nhost';
import { NavMenuInner } from './NavMenuClient';

export async function NavMenu() {
  const initialHasSession = await getHasNhostSession();
  return <NavMenuInner initialHasSession={initialHasSession} />;
}
