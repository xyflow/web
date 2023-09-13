'use client';

import Sidebar from '@/components/Sidebar';
import AuthProtected from './auth-protected';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProtected>
      <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto">
        <Sidebar />
        <div className="pt-4 pb-20 flex-1 min-h-[75vh] lg:pl-6 lg:pt-0 lg:border-l ">{children}</div>
      </div>
    </AuthProtected>
  );
}

export default DashboardLayout;
