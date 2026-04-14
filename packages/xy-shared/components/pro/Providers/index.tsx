import { Layout as NextraLayout } from 'nextra-theme-docs';
import {
  ComponentProps,
  FC,
  // createContext,
  // useEffect,
  // useMemo,
  // useState,
  // useTransition,
} from 'react';
// import { SubscriptionPlan } from '../../../types';
// import { getSubscription } from '../../../server-actions/get-subscription';
// import { usePathname, useRouter } from 'next/navigation';
// import { normalizeSubscription } from '../../../lib/pro-utils';
// import { mergeMetaWithPageMap } from 'nextra/merge-meta-with-page-map';
// import type { SubscriptionStatus } from '../../../hooks/use-subscription';

// const hidden = { display: 'hidden' };

// export const SubscriptionContext = createContext<SubscriptionStatus>(null!);

export const SubscriptionProvider: FC<ComponentProps<typeof NextraLayout>> = ({
  children,
  ...props
}) => {
  // const [isLoading, startTransition] = useTransition();
  // const [{ user, plan, teamPlan }, setSubscription] = useState<
  //   Awaited<ReturnType<typeof getSubscription>>
  // >({
  //   user: undefined,
  //   plan: SubscriptionPlan.FREE,
  //   teamPlan: SubscriptionPlan.FREE,
  // });

  // const pathname = usePathname();
  // const router = useRouter();

  // useEffect(() => {
  //   let cancelled = false;

  //   const fetchSubscription = async () => {
  //     try {
  //       let subscription = await getSubscription();

  //       const searchParams = new URLSearchParams(window.location.search);

  //       // When the user is redirected back from Stripe, the payment_success parameter is set.
  //       // We need to poll the subscription until it's not free anymore.
  //       if (searchParams.get('payment_success') === 'true') {
  //         for (
  //           let i = 0;
  //           i < 120 && !cancelled && subscription.plan === SubscriptionPlan.FREE;
  //           i++
  //         ) {
  //           await new Promise((r) => setTimeout(r, 1000));
  //           subscription = await getSubscription();
  //         }

  //         if (cancelled) return;

  //         searchParams.delete('payment_success');
  //         const qs = searchParams.toString();
  //         router.replace(qs ? `${pathname}?${qs}` : pathname);
  //       }

  //       if (!cancelled) setSubscription(subscription);
  //     } catch (error) {
  //       if (!cancelled) console.error('Failed to fetch subscription:', error);
  //     }
  //   };

  //   startTransition(fetchSubscription);

  //   return () => {
  //     cancelled = true;
  //   };
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // const ctx = useMemo(() => normalizeSubscription({ plan, teamPlan }), [plan, teamPlan]);

  // const value = useMemo(
  //   () => ({
  //     user,
  //     isLoading: isLoading || user === undefined,
  //     ...ctx,
  //   }),
  //   [user, isLoading, ctx],
  // );

  // const enhancedPageMap = useMemo(() => {
  //   return mergeMetaWithPageMap(props.pageMap, {
  //     pro: {
  //       items:
  //         user || user === undefined
  //           ? {
  //               'sign-in': hidden,
  //               'sign-up': hidden,
  //               ...(ctx.isSubscribed && { subscribe: hidden }),
  //               ...(!ctx.isAdmin && { team: hidden }),
  //             }
  //           : {
  //               dashboard: hidden,
  //               support: hidden,
  //               team: hidden,
  //               account: hidden,
  //               subscribe: hidden,
  //             },
  //     },
  //   });
  // }, [props.pageMap, user, ctx]);

  // const enhancedPageMap = mergeMetaWithPageMap(props.pageMap, {
  //         pro: {
  //           items:
  //             user || user === undefined
  //               ? {
  //                   'sign-in': hidden,
  //                   'sign-up': hidden,
  //                   ...(ctx.isSubscribed && { subscribe: hidden }),
  //                   ...(!ctx.isAdmin && { team: hidden }),
  //                 }
  //               : {
  //                   dashboard: hidden,
  //                   support: hidden,
  //                   team: hidden,
  //                   account: hidden,
  //                   subscribe: hidden,
  //                 },
  //         },
  //       }
  // });

  return (
    // <SubscriptionContext.Provider value={value}>
    <NextraLayout {...props} pageMap={props.pageMap}>
      {children}
    </NextraLayout>
    // </SubscriptionContext.Provider>
  );
};
