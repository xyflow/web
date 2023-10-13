import { Container, Text, Button } from 'xy-ui';

export default function ({ slug }: { slug: string }) {
  return (
    <Container variant="dark" className="mt-8">
      <div className="p-14 space-y-8">
        <iframe
          src={`https://xyflow-react-pro-examples.vercel.app/${slug}`}
          className="block h-[645px] w-full rounded-xl bg-white/10"
        />

        <div className="flex items-center space-between gap-32">
          <Text className="mt-4 mb-4">
            This is a Pro example! If you are subscribed to React Flow Pro you
            can access the annotated source code over on our{' '}
            <a className="underline" href="https://pro.xyflow.com">
              Pro platform
            </a>
            .
          </Text>
          <Button variant="secondary" className="text-primary shrink-0">
            <a href={`https://pro.xyflow.com/examples/${slug}`}>
              View Source Code
            </a>
          </Button>
        </div>
      </div>
    </Container>
  );
}
