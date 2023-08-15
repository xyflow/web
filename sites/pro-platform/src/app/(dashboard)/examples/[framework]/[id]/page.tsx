import SubscriptionCheck from './subscription-check';
import SubscribedExampleViewer from './subscribed';
import UnSubscribedExampleViewer from './unsubscribed';
import { Framework, getExamples } from 'utils/server/examples';

export default function ({ params }: { params: { id: string; framework: Framework } }) {
  // weird syntax but this is the only way (?) currently to render server components in a client component
  return (
    <SubscriptionCheck fallback={<UnSubscribedExampleViewer frameworkId={params.framework} exampleId={params.id} />}>
      <SubscribedExampleViewer frameworkId={params.framework} exampleId={params.id} />
    </SubscriptionCheck>
  );
}

export function generateStaticParams() {
  const examples = getExamples();

  return Object.values(examples).reduce<{ id: string; framework: Framework }[]>((params, ex) => {
    ex.forEach((example) => {
      params.push({ id: example.id, framework: example.framework });
    });

    return params;
  }, []);
}

export const dynamicParams = false;
