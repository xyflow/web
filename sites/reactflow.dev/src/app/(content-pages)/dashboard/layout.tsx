import { FC, Suspense, ReactNode } from 'react';
import { Sidebar } from '@/components/pro/Sidebar';
import { PageLoader } from '@/components/pro/Loader';
import { AuthProtected } from './auth-protected';

const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Suspense fallback={<PageLoader />}>
      <AuthProtected>
        <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto relative">
          <Sidebar />
          <div className="pt-4 pb-20 flex-1 min-h-[75vh] border-gray-200 lg:pl-6 lg:pt-0 lg:border-l min-w-0">
            {children}
          </div>
        </div>
      </AuthProtected>
    </Suspense>
  );
};

export default DashboardLayout;
