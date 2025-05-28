import { FC, ReactNode } from 'react';
import { Sidebar } from '@/components/pro/Sidebar';
import { redirect } from 'next/navigation';
import { getNhost } from '@/utils/nhost';

const DashboardLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  const nhost = await getNhost();
  const session = nhost.auth.getSession();

  if (!session) {
    redirect('/pro/signin');
  }
  return (
    <>
      <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto relative">
        <Sidebar />
        <div className="pt-4 pb-20 flex-1 min-h-[75vh] border-gray-200 lg:pl-6 lg:pt-0 lg:border-l min-w-0">
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
