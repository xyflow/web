import Link from 'next/link';
import Logo from '@/components/Logo';
import { Subscribed, PlanLabel } from '@/components/SubscriptionStatus';

import SignInSignOutButton from './SignInSignOutButton';

function Navigation() {
  return (
    <div className="border-b px-4 position-sticky top-0">
      <div className="flex items-center justify-between py-3">
        <Link href="/">
          <div className="flex items-center">
            <Logo width={32} height={32} />
            <div className="ml-2 font-black text-gray-900 text-xl">xyflow pro</div>
            <Subscribed>
              <div className="ml-2 text-sm py-0.5 px-2 rounded-full bg-pink-100 border border-react text-react">
                <PlanLabel />
              </div>
            </Subscribed>
          </div>
        </Link>
        <SignInSignOutButton />
      </div>
    </div>
  );
}

export default Navigation;
