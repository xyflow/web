import Link from 'next/link';

import { Button, Text, Container, cn } from '../../..';
import { AppWindow } from './app-window';

type GettingStartedProps = {
  libraryName: string;
  packageName: string;
};

function GettingStarted({ libraryName, packageName }: GettingStartedProps) {
  return (
    <Container variant="dark" className="mt-16 lg:mt-24">
      <div className="p-14">
        <Text size="lg" className="font-bold mb-2 text-center text-primary">
          Getting Started with {libraryName}
        </Text>
        <Text className="text-center max-w-lg mx-auto mb-6 lg:mb-8">
          Make sure you’ve installed npm, npmn or yarn. Then you can install
          {libraryName} via:
        </Text>

        <AppWindow>
          <pre className="!pl-0">
            <code className="inline text-lg">
              npm install <span className="text-primary">{packageName}</span>
            </code>
          </pre>
        </AppWindow>

        <div className={cn('flex justify-center mt-10 ')}>
          <Button variant="secondary" className="text-primary" asChild>
            <Link href={`/learn`}>Get Started</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}

export { GettingStarted, type GettingStartedProps };
