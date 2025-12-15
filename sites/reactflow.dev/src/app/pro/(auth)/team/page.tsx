import DashboardHeader from 'xy-shared/components/pro/DashboardHeader';
import ManageTeamCard from './_cards/manage-team';
import NotSubscribedNotification from 'xy-shared/components/pro/Notification/not-subscribed';
import { Subscribed } from 'xy-shared/components/pro/SubscriptionStatus';
import { createNhostClient } from 'xy-shared/utils/nhost';
import { getTeamMembers } from 'xy-shared/server-actions/get-team-members';

export default async function TeamPage() {
  const nhost = await createNhostClient();
  const user = nhost.getUserSession()?.user;

  if (!user) {
    throw new Error('User not found');
  }

  const teamSubscriptions = await getTeamMembers();

  return (
    <div className="max-w-3xl">
      <DashboardHeader
        title="Team"
        description="Invite your team members to grant them access to the Pro examples."
      />
      <div className="flex-1 space-y-4">
        <NotSubscribedNotification />
        <Subscribed requireAdminSubscription>
          <ManageTeamCard user={user} teamSubscriptions={teamSubscriptions ?? []} />
        </Subscribed>
      </div>
    </div>
  );
}
