import DashboardHeader from '../../../../components/pro/DashboardHeader';

import ChangeEmailCard from './change-email';
import ChangePasswordCard from './change-password';
import DeleteAccountCard from './delete-account';
import BillingCard from './billing';
import { requireSession } from '../../../../lib/nhost';

export default async function AccountPage() {
  const { user } = await requireSession();

  if (!user.email) {
    throw new Error('no email found');
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
