import Sidebar from '@/components/Sidebar';
import AuthProtection from './auth-protection';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProtection>
      <div className="flex flex-col lg:flex-row">
        <Sidebar />
        <div className="py-4 lg:px-6 lg:py-0 flex-1">{children}</div>
      </div>
    </AuthProtection>
  );
}

export default DashboardLayout;
