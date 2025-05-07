import { FC, ReactNode, Suspense } from 'react';
import { PageLoader } from '@/components/pro/Loader';
import { getNhost } from '@/utils/nhost';
import { redirect } from 'next/navigation';

const Layout: FC<{ children: ReactNode }> = async ({ children }) => {
  const nhost = await getNhost();
  const isAuthenticated = nhost.auth.isAuthenticated();

  if (isAuthenticated) {
    redirect('/');
  }

  return (
    <div className="relative h-full">
      <div
        className="absolute opacity-10 w-full h-[70vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(rgba(68,91,222,1) 0%, rgba(215,78,243,1) 25%, rgba(255,255,255,1) 50%)',
        }}
      />
      <div className="max-w-6xl mx-auto pt-10 mb-20">{children}</div>
    </div>
  );
};

export default Layout;
