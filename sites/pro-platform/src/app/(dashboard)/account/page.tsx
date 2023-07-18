import DashboardHeader from '@/components/DashboardHeader';

import ChangeEmailCard from './_cards/change-email';
import ChangePasswordCard from './_cards/change-password';

function AccountPage() {
  return (
    <div className="max-w-3xl mx-auto mb-20">
      <DashboardHeader
        title="Account"
        description="This page lets you manage your account. You can change your email, password, and delete your account."
      />
      <div className="flex-1 space-y-7">
        <ChangeEmailCard />
        <ChangePasswordCard />
      </div>
    </div>
  );
}

export default AccountPage;
