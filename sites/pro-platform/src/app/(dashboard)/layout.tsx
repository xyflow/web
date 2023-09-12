'use client';

import Sidebar from '@/components/Sidebar';
import AuthProtected from './auth-protected';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProtected>
      <div className="flex flex-col lg:flex-row w-full">
        <Sidebar />
        <div className="py-4 lg:pl-6 lg:py-0 flex-1 lg:border-l min-h-[75vh]">{children}</div>
      </div>
    </AuthProtected>
  );
}

export default DashboardLayout;
