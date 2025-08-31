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
import { mergeMetaWithPageMap } from 'nextra/page-map';
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

  const value = useMemo(
    () => ({
      user,
      isLoading: isLoading || user === undefined,
      refetchUser,
      ...normalizeSubscription({ plan, teamPlan }),
    }),
    [user, refetchUser, isLoading, plan, teamPlan],
  );

  const pageMap = useMemo(() => {
    const subscription = normalizeSubscription({ plan, teamPlan });
    return mergeMetaWithPageMap(props.pageMap, {
      pro: {
        items: user || user === undefined
          ? {
              'sign-in': hidden,
              'sign-up': hidden,
              ...(subscription.isSubscribed && { subscribe: hidden }),
              ...(!subscription.isAdmin && { team: hidden }),
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
  }, [props.pageMap, user, plan, teamPlan]);

  return (
    <SubscriptionContext.Provider value={value}>
      <NextraLayout {...props} pageMap={pageMap}>
        {children}
      </NextraLayout>
    </SubscriptionContext.Provider>
  );
};
