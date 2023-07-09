import Link from 'next/link';
import Logo from '@/components/Logo';

import SignInSignOutButton from './SignInSignOutButton';

function Navigation() {
  return (
    <div className="border-b px-4 position-sticky top-0">
      <div className="flex items-center justify-between py-3">
        <Link href="/">
          <div className="flex items-center">
            <Logo width={32} height={32} />
            <div className="ml-2 font-black text-gray-900 text-xl">xyflow pro</div>
          </div>
        </Link>
        <SignInSignOutButton />
      </div>
    </div>
  );
}

export default Navigation;
