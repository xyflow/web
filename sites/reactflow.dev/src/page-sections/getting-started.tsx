import { type ReactNode } from 'react';
import Link from 'next/link';

import { Button, Text, Container, cn } from 'xy-ui';

function AppWindow({ children }: { children: ReactNode }) {
  return (
    <div className="border border-solid border-gray-600 rounded-md max-w-3xl mx-auto bg-black">
      <div className="flex p-4">
        <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2" />
        <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
      </div>
      <div className="px-4 py-2">{children}</div>
    </div>
  );
}

export default function GettingStarted() {
  return (
    <Container variant="dark" className="mt-16 lg:mt-24">
      <div className="p-14">
        <Text
          size="lg"
          className={cn('font-bold mb-2 text-center text-primary')}
        >
          Getting Started with React Flow
        </Text>
        <Text className="text-center max-w-lg mx-auto mb-6 lg:mb-8">
          Make sure you’ve installed npm, pnpm or yarn. Then you can install
          React Flow via:
        </Text>

        <AppWindow>
          <pre className="!pl-0">
            <code className="inline text-lg">
              npm install{' '}
              <span className="text-primary">@xyflow/react-flow</span>
            </code>
          </pre>
        </AppWindow>

        <div className={cn('flex justify-center mt-10 ')}>
          <Button variant="secondary" className="text-primary" asChild>
            <Link href="/docs">Get Started</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
