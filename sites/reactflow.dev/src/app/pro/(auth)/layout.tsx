import { redirect } from 'next/navigation';
import { getNhost } from '@/utils/nhost';
import { useMDXComponents as getMdxComponents } from '@/mdx-components';
import { SubscriptionProvider } from '@/components/pro/Providers';
import { getSubscription } from '@/server-actions';

// Use Nextra theme docs layout with the sidebar
const { wrapper: Wrapper } = getMdxComponents();

export default async function Layout({ children }: LayoutProps<'/pro'>) {
  const nhost = await getNhost();
  const isAuthenticated = nhost.auth.isAuthenticated();
  console.log('(auth)', { isAuthenticated });
  if (!isAuthenticated) {
    redirect('/pro/sign-in');
  }
  const subscriptionContext = await getSubscription();
  return (
    <SubscriptionProvider value={subscriptionContext}>
      <Wrapper
        toc={[]}
        // @ts-expect-error -- we explicitly provide metadata as empty object
        metadata={{}}
      >
        {children}
      </Wrapper>
    </SubscriptionProvider>
  );
}
