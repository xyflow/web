import SubscriptionCheck from './subscription-check';
import SubscribedExampleViewer from './subscribed';
import UnSubscribedExampleViewer from './unsubscribed';
import { Framework, getExampleIds, getExamples } from 'utils/server/examples';

export default function ({ params }: { params: { id: string; framework: Framework } }) {
  // the only way to render a server component (UnSubscribedExampleViewer, SubscribedExampleViewer) within a client component (SubscriptionCheck) is to pass it as a prop or children
  return (
    <SubscriptionCheck fallback={<UnSubscribedExampleViewer frameworkId={params.framework} exampleId={params.id} />}>
      <SubscribedExampleViewer frameworkId={params.framework} exampleId={params.id} />
    </SubscriptionCheck>
  );
}

export function generateStaticParams() {
  return Object.values(Framework).reduce<{ id: string; framework: Framework }[]>((params, framework) => {
    const ids = getExampleIds(framework);

    ids.forEach((id) => {
      params.push({ id, framework });
    });

    return params;
  }, []);
}

export const dynamicParams = false;
