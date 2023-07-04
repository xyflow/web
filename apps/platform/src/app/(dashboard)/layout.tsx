import AuthProtection from './auth-protection';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProtection>
      <div className="mx-auto max-w-7xl">{children}</div>
    </AuthProtection>
  );
}

export default DashboardLayout;
