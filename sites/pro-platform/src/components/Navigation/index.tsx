import Link from 'next/link';

import Logo from '@/components/Logo';
import NavMenu from './NavMenu';

function Navigation() {
  return (
    <div className="border-b px-4 position-sticky top-0">
      <div className="flex items-center justify-between py-3">
        <Link href="/">
          <div className="flex items-center">
            <Logo width={32} height={32} />
            <div className="ml-2 font-black text-gray-900 text-xl flex items-center">
              <div>xyflow</div>
              <div className="bg-pink-50 uppercase ml-1 text-xs border border-react text-react font-semibold px-1 py-0.5 rounded-full">
                pro
              </div>
            </div>
          </div>
        </Link>
        <NavMenu />
      </div>
    </div>
  );
}

export default Navigation;
