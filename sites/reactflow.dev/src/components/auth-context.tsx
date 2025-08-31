'use client';

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useTransition,
  useEffect,
  useCallback,
  useMemo,
  FC,
} from 'react';
import { User } from '@nhost/nhost-js';
import { getUser } from '@/server-actions';
import { usePathname } from 'next/navigation';
import { usePrevious } from '@/hooks/usePrevious';

interface AuthContextType {
  user?: User | null;
  isLoading: boolean;
  refetchUser: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
