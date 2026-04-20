'use client';

import { Layout as NextraLayout } from 'nextra-theme-docs';
import { ComponentProps, startTransition, useEffect, useMemo, useState } from 'react';
import { SubscriptionPlan } from '../../../types';

import { usePathname, useRouter } from 'next/navigation';

import { mergeMetaWithPageMap } from 'nextra/merge-meta-with-page-map';
import { getSubscriptionStatus } from '../../../server-actions/get-subscription';
import { useSession } from '../../../lib/use-session';

const hidden = { display: 'hidden' };

export function SubscriptionProvider({
  children,
  ...props
}: ComponentProps<typeof NextraLayout>) {
  const [status, setStatus] =
    useState<Awaited<ReturnType<typeof getSubscriptionStatus>>>();

  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    let cancelled = false;

    const fetchSubscription = async () => {
      try {
        let subscription = await getSubscriptionStatus();

        const searchParams = new URLSearchParams(window.location.search);

        // When the user is redirected back from Stripe, the payment_success parameter is set.
        // We need to poll the subscription until it's not free anymore.
        if (searchParams.get('payment_success') === 'true') {
          for (
            let i = 0;
            i < 120 && !cancelled && subscription.plan === SubscriptionPlan.FREE;
            i++
          ) {
            await new Promise((r) => setTimeout(r, 1000));
            subscription = await getSubscriptionStatus();
          }

          if (cancelled) return;

          searchParams.delete('payment_success');
          const qs = searchParams.toString();
          router.replace(qs ? `${pathname}?${qs}` : pathname);
        }

        if (!cancelled) setStatus(subscription);
      } catch (error) {
        if (!cancelled) console.error('Failed to fetch subscription:', error);
      }
    };

    startTransition(fetchSubscription);

    return () => {
      cancelled = true;
    };
  }, [session]); // eslint-disable-line react-hooks/exhaustive-deps

  const enhancedPageMap = useMemo(() => {
    return mergeMetaWithPageMap(props.pageMap, {
      pro: {
        items:
          status && status?.user !== null // user is logged in
            ? {
                ...(status?.isSubscribed && { subscribe: hidden }),
                ...(!status?.isAdmin && { team: hidden }),
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
  }, [props.pageMap, status]);

  return (
    <NextraLayout {...props} pageMap={enhancedPageMap}>
      {children}
    </NextraLayout>
  );
}
