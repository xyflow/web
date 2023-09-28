import Link from 'next/link';

import Logo from '@/components/Logo';
import NavMenu from './NavMenu';

function Navigation() {
  return (
    <div className="bg-white relative border-b px-4 top-0">
      <div className="flex items-center justify-between py-3 max-w-7xl mx-auto">
        <Link href="/">
          <div className="flex items-center">
            <Logo width={28} height={28} />
            <div className="ml-2 font-black text-gray-900 text-xl flex items-center">
              xyflow<span className="text-react">pro</span>
            </div>
          </div>
        </Link>
        <NavMenu />
      </div>
    </div>
  );
}

export default Navigation;
