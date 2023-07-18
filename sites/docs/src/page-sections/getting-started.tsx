import { type ReactNode } from 'react';
import Link from 'next/link';

import { Button, Heading, Text, Container, cn } from 'xy-ui';
import useXYSite from '@/hooks/use-xy-site';

function AppWindow({ children }: { children: ReactNode }) {
  return (
    <div className="border border-solid border-gray-600 rounded-md max-w-3xl mx-auto">
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
  const { lib, site } = useXYSite();

  return (
    <Container variant="dark" className="mt-16 lg:mt-24">
      <div className="p-14">
        <Text
          size="lg"
          className={cn('font-bold mb-2 text-center', `text-${site}`)}
        >
          Getting Started with {lib}
        </Text>
        <Text className="text-center max-w-lg mx-auto mb-6 lg:mb-8">
          Make sure you’ve the node.js and package manager installed. Then, type
          this in terminal:
        </Text>

        <AppWindow>
          <pre className="!pl-0">
            <code className="inline">
              npm install <span className={`text-${site}`}>@xyflow/{site}</span>
            </code>
          </pre>
        </AppWindow>

        <div className={cn('flex justify-center mt-10 ')}>
          <Button variant="secondary" className={`text-${site}`} asChild>
            <Link href={`/${site}-flow/docs`}>Get Started</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
