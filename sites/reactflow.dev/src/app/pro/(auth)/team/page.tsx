import DashboardHeader from '@/components/pro/DashboardHeader';
import ManageTeamCard from './_cards/manage-team';
import NotSubscribedNotification from '@/components/pro/Notification/not-subscribed';
import { Subscribed } from '@/components/pro/SubscriptionStatus';
import { getNhost } from '@/utils/nhost';
import { getTeamMembers } from '@/server-actions/get-team-members';

export default async function TeamPage() {
  const nhost = await getNhost();
  const [user, teamSubscriptions] = await Promise.all([
    nhost.auth.getUser(),
    getTeamMembers(),
  ]);
  if (!user) {
    throw new Error('User not found');
  }

  return (
    <div className="max-w-3xl">
      <DashboardHeader
        title="Team"
        description="Invite your team members to grant them access to the Pro examples."
      />
      <div className="flex-1 space-y-4">
        <NotSubscribedNotification />
        <Subscribed requireAdminSubscription>
          <ManageTeamCard user={user} teamSubscriptions={teamSubscriptions} />
        </Subscribed>
      </div>
    </div>
  );
}
