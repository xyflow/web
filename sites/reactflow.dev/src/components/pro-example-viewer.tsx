import Link from 'next/link';
import { Container, Text, Button } from '@xyflow/xy-ui';

export default function ({ slug }: { slug: string }) {
  return (
    <Container variant="dark" className="mt-8">
      <div className="p-8">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 mb-8">
          <Text>
            This is a Pro example. You can access the annotated source code if
            you are subscribed to{' '}
            <Link className="underline" href="/pro">
              React Flow Pro
            </Link>
            .
          </Text>
          <Button variant="secondary" className="text-primary shrink-0">
            <a href={`https://pro.reactflow.dev/examples/${slug}`}>
              View Source Code
            </a>
          </Button>
        </div>

        <iframe
          src={`https://xyflow-react-pro-examples.vercel.app/${slug}`}
          className="block h-[645px] w-full rounded-xl bg-white"
        />
      </div>
    </Container>
  );
}
