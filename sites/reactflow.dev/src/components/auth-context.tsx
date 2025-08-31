'use client';

import {
  createContext,
  useContext,
  useState,
  useTransition,
  useEffect,
  useCallback,
  useMemo,
  FC,
  ComponentProps,
} from 'react';
import { User } from '@nhost/nhost-js';
import { getUser } from '@/server-actions';
import { usePathname } from 'next/navigation';
import { usePrevious } from '@/hooks/usePrevious';
import { SubscriptionProvider } from '@/components/pro/Providers';
import { Layout as NextraLayout } from 'nextra-theme-docs';

interface AuthContextType {
  user?: User | null;
  isLoading: boolean;
  refetchUser: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export const Providers: FC<ComponentProps<typeof NextraLayout>> = ({
  children,
  ...props
}) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [isLoading, startTransition] = useTransition();

  const refetchUser = useCallback(async () => {
    setUser(await getUser());
  }, []);

  const pathname = usePathname();
  const prevPathname = usePrevious(pathname);

  // Workaround to refetch a user after calling Next.js redirect
  const shouldRefetch =
    pathname === '/pro/dashboard' &&
    (prevPathname === '/pro/sign-in' || prevPathname === '/pro/sign-up');

  useEffect(() => {
    startTransition(refetchUser);
  }, [refetchUser, shouldRefetch]);

  const value = useMemo(
    () => ({
      user,
      isLoading: isLoading || user === undefined,
      refetchUser,
    }),
    [user, refetchUser, isLoading],
  );

  return (
    <AuthContext.Provider value={value}>
      <SubscriptionProvider>
        <NextraLayout {...props}>{children}</NextraLayout>
      </SubscriptionProvider>
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within a Providers');
  }
  return context;
}
