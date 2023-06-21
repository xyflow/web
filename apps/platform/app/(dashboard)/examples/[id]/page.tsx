import useSubscription from 'hooks/useSubscription';

import SubscribedExampleViewer from './subscribed';
import UnsubscribedExampleViewer from './unsubscribed';

export default function ({ params }: { params: { id: string } }) {
  const { isSubscribed } = useSubscription();

  return isSubscribed ? (
    <SubscribedExampleViewer exampleId={params.id} />
  ) : (
    <UnsubscribedExampleViewer exampleId={params.id} />
  );
}
