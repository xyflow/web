import SubscriptionCheck from './subscription-check';
import SubscribedExampleViewer from './subscribed';
import UnSubscribedExampleViewer from './unsubscribed';

export default function ({ params }: { params: { id: string } }) {
  return (
    <SubscriptionCheck fallback={<UnSubscribedExampleViewer exampleId={params.id} />}>
      <SubscribedExampleViewer exampleId={params.id} />
    </SubscriptionCheck>
  );
}
