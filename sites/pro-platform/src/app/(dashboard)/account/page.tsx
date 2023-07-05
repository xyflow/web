import ChangeEmailCard from './_cards/change-email';
import ChangePasswordCard from './_cards/change-password';

function AccountPage() {
  return (
    <div className="max-w-4xl mx-auto mb-20">
      <div className="my-6">
        <h2 className="text-3xl font-black mb-2">Account</h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          This page lets you manage your account. You can change your email, password, and delete your account.
        </p>
      </div>
      <div className="flex-1 space-y-7">
        <ChangeEmailCard />
        <ChangePasswordCard />
      </div>
    </div>
  );
}

export default AccountPage;
