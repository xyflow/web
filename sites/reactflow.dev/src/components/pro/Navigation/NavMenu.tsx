import { FC } from 'react';
import Link from 'next/link';
import { Button } from '@xyflow/xy-ui';
import { UserMenu } from './UserMenu';
import { getNhost } from '@/utils/nhost';

const NavMenu: FC = async () => {
  const nhost = await getNhost()
  const user = nhost.auth.getUser()
  if (user) {
    return <UserMenu />;
  }
  return (
    <Button asChild variant="secondary">
      <Link href="/signin">Sign In / Sign Up</Link>
    </Button>
  );
};

export default NavMenu;
