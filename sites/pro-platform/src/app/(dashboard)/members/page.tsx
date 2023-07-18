import DashboardHeader from '@/components/DashboardHeader';
import ManageTeamCard from './_cards/manage-team';

export default function MembersPage() {
  return (
    <div className="max-w-4xl mx-auto mb-20">
      <DashboardHeader
        title="Members"
        description="Welcome to xyflow pro! With a subscription, you are ensuring the sustainable maintenance and development of our open-source libraries."
      />
      <div className="flex-1 space-y-7">
        <ManageTeamCard />
      </div>
    </div>
  );
}
