import DashboardHeader from '../../../../components/pro/DashboardHeader';
import NotSubscribedNotification from '../../../../components/pro/Notification/not-subscribed';
import { Subscribed } from '../../../../components/pro/SubscriptionStatus';
import { requireSession } from '../../../../lib/nhost';
import ManageTeamCard from './manage-team';

export default async function TeamPage() {
  const { user } = await requireSession();

  return (
    <div className="max-w-3xl">
      <DashboardHeader
        title="Team"
        description="Invite your team members to grant them access to the Pro examples."
      />
      <div className="flex-1 space-y-4">
        <NotSubscribedNotification />
        <Subscribed requireAdminSubscription>
          <ManageTeamCard user={user} />
        </Subscribed>
      </div>
    </div>
  );
}
