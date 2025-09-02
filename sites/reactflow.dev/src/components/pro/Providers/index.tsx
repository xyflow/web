'use client';

import {
  ComponentProps,
  createContext,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react';
import { SubscriptionPlan } from '@/types';
import { getSubscription } from '@/server-actions';
import { usePathname } from 'next/navigation';
import { usePrevious } from '@/hooks/usePrevious';
import { normalizeSubscription } from '@/utils/pro-utils';
import { mergeMetaWithPageMap } from 'nextra/merge-meta-with-page-map';
import { Layout as NextraLayout } from 'nextra-theme-docs';
import type { SubscriptionStatus } from '@/hooks/useSubscription';

const hidden = { display: 'hidden' };

export const SubscriptionContext = createContext<SubscriptionStatus>(null!);

export const SubscriptionProvider: FC<ComponentProps<typeof NextraLayout>> = ({
  children,
  ...props
}) => {
  const [isLoading, startTransition] = useTransition();
  const [{ user, plan, teamPlan }, setSubscription] = useState<
    Awaited<ReturnType<typeof getSubscription>>
  >({
    user: undefined,
    plan: SubscriptionPlan.FREE,
    teamPlan: SubscriptionPlan.FREE,
  });

  const refetchUser = useCallback(async () => {
    setSubscription(await getSubscription());
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

  const ctx = useMemo(() => normalizeSubscription({ plan, teamPlan }), [plan, teamPlan]);

  const value = useMemo(
    () => ({
      user,
      isLoading: isLoading || user === undefined,
      refetchUser,
      ...ctx,
    }),
    [user, isLoading, refetchUser, ctx],
  );

  const enhancedPageMap = useMemo(() => {
    return mergeMetaWithPageMap(props.pageMap, {
      pro: {
        items:
          user || user === undefined
            ? {
                'sign-in': hidden,
                'sign-up': hidden,
                ...(ctx.isSubscribed && { subscribe: hidden }),
                ...(!ctx.isAdmin && { team: hidden }),
              }
            : {
                dashboard: hidden,
                support: hidden,
                team: hidden,
                account: hidden,
                subscribe: hidden,
              },
      },
    });
  }, [props.pageMap, user, ctx]);

  return (
    <SubscriptionContext.Provider value={value}>
      <NextraLayout {...props} pageMap={enhancedPageMap}>
        {children}
      </NextraLayout>
    </SubscriptionContext.Provider>
  );
};
