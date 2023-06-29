import SubscriptionCheck from './subscription-check';
import SubscribedExampleViewer from './subscribed';
import UnSubscribedExampleViewer from './unsubscribed';

export default function ({ params }: { params: { id: string } }) {
  // weird syntax but this is the only way currently to render server components in a client component
  return (
    <SubscriptionCheck fallback={<UnSubscribedExampleViewer exampleId={params.id} />}>
      <SubscribedExampleViewer exampleId={params.id} />
    </SubscriptionCheck>
  );
}
