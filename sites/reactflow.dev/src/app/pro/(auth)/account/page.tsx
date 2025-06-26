import DashboardHeader from '@/components/pro/DashboardHeader';

import ChangeEmailCard from './_cards/change-email';
import ChangePasswordCard from './_cards/change-password';
import DeleteAccountCard from './_cards/delete-account';
import BillingCard from './_cards/billing';
import { getNhost } from '@/utils/nhost';

async function AccountPage() {
  const nhost = await getNhost();
  const user = nhost.auth.getUser();
  if (!user?.email) {
    throw new Error('User email must exist');
  }

  return (
    <div className="max-w-3xl">
      <DashboardHeader
        title="Account"
        description="This page lets you manage your account. You can change your email, password, and delete your account."
      />
      <div className="flex-1 space-y-7">
        <BillingCard />
        <ChangeEmailCard userEmail={user.email} />
        <ChangePasswordCard />
        <DeleteAccountCard userEmail={user.email} />
      </div>
    </div>
  );
}

export default AccountPage;
