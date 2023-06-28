// import useSubscription from 'hooks/useSubscription';

import SubscribedExampleViewer from './subscribed';
import UnsubscribedExampleViewer from './unsubscribed';

// @todo add auth
export default function ({ params }: { params: { id: string } }) {
  // @todo how to check the subscription status here (maybe in a server component?)
  // const { isSubscribed } = useSubscription();

  const isSubscribed = true;

  return isSubscribed ? (
    <SubscribedExampleViewer exampleId={params.id} />
  ) : (
    <UnsubscribedExampleViewer exampleId={params.id} />
  );
}
